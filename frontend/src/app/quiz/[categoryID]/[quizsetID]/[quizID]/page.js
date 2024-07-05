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
  const { categoryID, quizsetID, quizID } = params;

  if (!categoryID || !quizsetID || !quizID) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Quiz {quizID} in Quiz Set {quizsetID} for Category {categoryID}</h1>
      <QuizCard quiz={quizData} />
    </div>
  );
};

export default SingleQuizPage;
