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

  useEffect(() => {
    if (categoryID) {
      fetchQuizByCategory(categoryID);
    }
  }, [categoryID]); // 确保仅在categoryID变化时调用

  const fetchQuizByCategory = async (category) => {
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const fetchQuizById = async (id) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getSingleQuestion`, {
        params: { questionID: id }
      });
      console.log('Fetched quiz by ID:', response.data);
      setQuiz(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz by ID:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (selectedAnswer) => {
    try {
      const isCorrect = selectedAnswer === quiz.choices[quiz.answer];
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/submitAnswer`, {
        quizID: quiz.id,
        selectedAnswer,
        isCorrect
      });
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error('Error submitting answer:', error.response ? error.response.data : error.message);
    }
  };

  const handleNextQuestion = () => {
    fetchQuizByCategory(categoryID); // 获取同类别的下一题
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-violet-50 min-h-screen">
      <section className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Quiz in Category {categoryID}</h1>
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