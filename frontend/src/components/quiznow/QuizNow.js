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
const getRandomQuestion = (questions) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
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
        params: { category: randomCategory  }
        });
      console.log('API response:', response.data);
      if (response.data.length > 0) {
        const randomQuestion = getRandomQuestion(response.data);
        setQuiz(randomQuestion);
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
    setIsButtonDisabled(true);
    const isCorrect = selectedAnswerIndex === quiz.answer;
    setFeedback(isCorrect ? 'Congratulations! You are right!' : 'Wrong, but okay! Try next!');
    if (isCorrect) {
      await recordAnswered(quiz.id); // 只有在回答正确时才记录
    }
    setAnsweredCount(prevCount => prevCount + 1);
    setIsButtonDisabled(false);
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
      setIsButtonDisabled(false);
    }
  };

  //get next question from recommendation
  const handleNextQuestion = async () => {
    setLoading(true);
    console.log("handlenext questions:5")
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
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-violet-50 min-h-screen">
      <section className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Quiz Now</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {quiz && answeredCount < 5 ? (
          <QuizNowCard
            quiz={quiz}
            onAnswerSubmit={handleAnswerSubmit}
            feedback={feedback}
            onNextQuestion={handleNextQuestion}
            onLike={handleLike}
            isButtonDisabled={isButtonDisabled}
          />
        ) : answeredCount >= 6 ? (
          <div>
            <h2 className="text-3xl font-bold mb-4">Well done!</h2>
            <Link href="/">
              <Button className="h-[52px] text-xl shadow-md" variant="outline">Return Home</Button>
            </Link>
          </div>
        ) : (
          <div>No quiz data available</div>
        )}
      </section>
    </div>
  );
};

export default QuizNow;