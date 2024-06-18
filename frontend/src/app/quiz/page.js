import React from 'react';
import QuizCard from '@/components/quiz/QuizCard';

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

const QuizPage = () => {
  return (
    <div>
      <QuizCard quiz={quizData} />
    </div>
  );
};

export default QuizPage;
