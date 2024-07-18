"use client";
import React, { useEffect, useState,useContext } from 'react';
import { useParams } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import QuizCard from '@/components/quiz/QuizCard';
import axios from 'axios';

//ui
import { Button } from '@/components/ui/button';

const CategorizedQuiz = () => {
  const params = useParams();
  const{user, token}=useContext(AuthContext);
  const { categoryID } = params;
  const [quiz, setQuiz] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoryID) {
      fetchQuizByCategory(categoryID);
    }
  }, [categoryID]);

  const fetchQuizByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching quiz with category: ${category}`);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getQuestionByCategory`, 
        {
        params: { category: category },
        headers: {
          'Authorization': `Bearer ${token}`
        }
        });
      console.log('API response:', response.data);
      if (response.data) {
        setQuiz(response.data);
      } else {
        setQuiz(null);
      }
    } catch (error) {
      console.error('Error fetching quiz:', error.response ? error.response.data : error.message);
      setError('Failed to fetch quiz. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

//answer submit + only record right answer
const handleAnswerSubmit = async (selectedAnswerIndex) => {
  const isCorrect = selectedAnswerIndex === quiz.answer;
  setFeedback(isCorrect ? 'Congratulations! You are right!' : 'Wrong, but okay! Try next!');
  if (isCorrect) {
    await recordAnswered(quiz.id); 
  }
  setAnsweredCount(prevCount => prevCount + 1);
};

const recordAnswered = async (questionId) => {
  try {
    const response=await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/answerQuestion`, 
      { questionId:questionId }, 
      {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`record question`, response.data);
  } catch (error) {
    console.error('Error recording answered question:', error);
  }
};

//record user like
const handleLike = async () => {
  setIsButtonDisabled(true);
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/likeQuestion`, 
      { questionId: quiz.id 
      }, 
      {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`Liked question ${quiz.id}`, response.data);
  } catch (error) {
    console.error('Error liking question:', error);
  } finally {
  }
};

//fetch next question
  const handleNextQuestion = () => {
    setIsButtonDisabled(false);
    if (answeredCount < 7) {
    fetchQuizByCategory(categoryID);
    }
    setFeedback(null);
  };

  if (loading) {
    return(
       <div className="bg-violet-50 min-h-screen">
       <section className="container mx-auto p-6">
       <h1 className="text-3xl font-bold text-center">
          Loading...
          </h1>
      </section>
      </div>
    )
  }

  return (
    <div className="bg-violet-50 min-h-screen">
      <section className="mx-auto p-6">
        <h1 className="text-3xl font-bold text-center"> {categoryID}</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {quiz  && answeredCount < 7 ?(
          <QuizCard
            quiz={quiz}
            onAnswerSubmit={handleAnswerSubmit}
            feedback={feedback}
            onNextQuestion={handleNextQuestion}
            onLike={handleLike}
            isButtonDisabled={isButtonDisabled}
          />
        ) : answeredCount >= 7 ? (
          <div>
            <h2 className="flex justify-center font-extrabold text-3xl my-10 text-rose-500">Well done!</h2>
            <Link href="/">
              <Button className="flex justify-center mx-auto h-[52px] w-[200px] text-xl text-white shadow-md bg-blue-500 hover:bg-blue-600">Return Home</Button>
            </Link>
          </div>
        ) : (
          <div>No quiz data available</div>
        )}
      </section>
    </div>
  );
};

export default CategorizedQuiz;