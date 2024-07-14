"use client";
import React, { useEffect, useState } from 'react';
import QuizNowCard from '@/components/quiznow/QuizNowCard';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const QuizNow = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [answeredCount, setAnsweredCount] = useState(0);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoic3JAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiJzciJ9LCJleHAiOjE3MjA5NDEwNDZ9.fDte_TSfTfb4PbSfUsf4RDBG3A3hwEPv-fOPk-SxgS4'; // 使用生成的JWT令牌

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const hardcodedQuestionID = '01PHtLBzCXDHJNnEIArw';

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions/getSingleQuestion`, {
        params: { questionID: hardcodedQuestionID },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data) {
        setQuiz(response.data);
      } else {
        setQuiz(null);
      }
    } catch (error) {
      setError('Failed to fetch quiz. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (selectedAnswerIndex) => {
    const isCorrect = selectedAnswerIndex === quiz.answer;
    setFeedback(isCorrect ? 'Congratulations!' : 'So close!');
    await recordAnswered(quiz.id); // 假设quiz对象有一个唯一的id
    setAnsweredCount(prevCount => prevCount + 1);
  };

  const recordAnswered = async (questionId) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/answerQuestion`, { questionId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error recording answered question:', error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/likeQuestion`, { questionId: quiz.id }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error liking question:', error);
    }
  };

  const handleNextQuestion = () => {
    if (answeredCount < 5) {
      fetchQuiz();
      setFeedback(null);
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
          />
        ) : answeredCount >= 5 ? (
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