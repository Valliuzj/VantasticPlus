"use client";
import React from 'react';
import QuizCard from '@/components/quiz/QuizCard';
import { useParams } from 'next/navigation';

const quizData = {
  id: "q12345",
  question: "What is the capital city of France?",
  options: [
    "A) Paris",
    "B) Madrid",
    "C) Rome",
    "D) Berlin"
  ],
  correctAnswer: "A",
  explanation: "Paris is the capital city of France.",
  tags: {
    categories: ["geography", "history"],
    difficulty: "easy",
    likes: 150
  }
};

const SingleQuizPage = () => {
  const params = useParams();
  const { categoryID, quizID } = params;

  if (!categoryID || !quizID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-violet-50 min-h-screen">
      <section className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Quiz {quizID} in Category {categoryID}</h1>
        <QuizCard quiz={quizData} />
      </section>
    </div>
  );
};

export default SingleQuizPage;