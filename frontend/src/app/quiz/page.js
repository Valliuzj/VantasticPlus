"use client";
import React from 'react';
import QuizCard from '@/components/quiz/QuizCard';
import Link from 'next/link';

const QuizPage = () => {
  return (
    <div>
      <h1>Quiz Categories</h1>
      <li><Link href="/quiz/category1">Category 1</Link></li>
      <li><Link href="/quiz/category2">Category 2</Link></li>
    </div>
  );
};

export default QuizPage;
