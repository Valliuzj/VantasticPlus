"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import QuizCard from '@/components/quiz/QuizCard';
import axios from 'axios';

const CategorizedQuiz = () => {
  const params = useParams();
  const { categoryID } = params;
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getQuestionByCategory`, {
        params: { category: category }
      });
      console.log('API response:', response.data);
      if (response.data.length > 0) {
        const randomQuiz = response.data[Math.floor(Math.random() * response.data.length)];
        setQuiz(randomQuiz);
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

  const handleAnswerSubmit = (selectedAnswerIndex) => {
    const isCorrect = selectedAnswerIndex === quiz.answer;
    setFeedback(isCorrect ? 'Congratulations!' : 'So close!');
  };

  const handleNextQuestion = () => {
    fetchQuizByCategory(categoryID);
    setFeedback(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-violet-50 min-h-screen">
      <section className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Quiz in Category {categoryID}</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {quiz ? (
          <QuizCard
            quiz={quiz}
            onAnswerSubmit={handleAnswerSubmit}
            feedback={feedback}
            onNextQuestion={handleNextQuestion}
          />
        ) : (
          <div>No quiz data available</div>
        )}
      </section>
    </div>
  );
};

export default CategorizedQuiz;