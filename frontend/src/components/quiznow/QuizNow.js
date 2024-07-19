"use client";
import React, { useContext, useEffect, useState,useRef } from 'react';
import QuizNowCard from '@/components/quiznow/QuizNowCard';
import axios from 'axios';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

//ui
import { Button } from '@/components/ui/button';

//random category
const VALID_CATEGORIES = ['Biology', 'History', 'Culture', 'Travel', 'Art', 'Science', 'Geography'];
const getRandomCategory = () => {
  const randomIndex = Math.floor(Math.random() * VALID_CATEGORIES.length);
  return VALID_CATEGORIES[randomIndex];
};

const QuizNow = () => {
  const [quiz, setQuiz] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //set up auth to protect pages
  const{user, token}=useContext(AuthContext);
  const router = useRouter();
  const alertShown = useRef(false);
  useEffect(() => {
    if (!user && !alertShown.current) {
      alertShown.current = true;
      alert("Please log in/sign up!");
      router.push('/');
      
    }
  }, [user, router]);

  //set up the first question
  useEffect(() => {
    const fetchInitialQuiz = async () => {
      const randomCategory = getRandomCategory();
      await fetchQuizByCategory(randomCategory);
    };
    fetchInitialQuiz();
  }, []);

  useEffect(() => {
    console.log('Quiz state updated:', quiz);
  }, [quiz]);

  const fetchQuizByCategory = async (randomCategory ) => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching quiz with category: ${randomCategory}`);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/getQuestionByCategory`, 
        {
        params: { category: randomCategory  },
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

  //get next question from recommendation
  const handleNextQuestion = async () => {
    setLoading(true);
    setIsButtonDisabled(false);
    //check point
    console.log(`handlenext questions"${answeredCount}`)
    if (answeredCount < 7) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recommend`, 
          {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if(response.status === 200){
        setQuiz(response.data);
        setFeedback(null);
        console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching recommended quiz:', error.response ? error.response.data : error.message);
        setError('Failed to fetch recommended quiz. Please try again later.');
      } finally {
        setLoading(false); 
      }
    }
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
      <section className="container mx-auto p-6">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {quiz && answeredCount < 7 ? (
          <QuizNowCard
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
          <section className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center">
             No Quiz Data
             </h1>
         </section>
        )}
      </section>
    </div>
  );
};

export default QuizNow;