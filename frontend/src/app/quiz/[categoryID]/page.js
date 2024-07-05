"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const CategoryPage = ({ params }) => {
  const [categoryID, setCategoryID] = useState(null);

  useEffect(() => {
    if (params.categoryID) {
      setCategoryID(params.categoryID);
    }
  }, [params.categoryID]);

  if (!categoryID) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Quiz Sets for Category {categoryID}</h1>
      <ul>
        <li><Link href={`/quiz/${categoryID}/quizset1`}>Quiz Set 1</Link></li>
        <li><Link href={`/quiz/${categoryID}/quizset2`}>Quiz Set 2</Link></li>
        <li><Link href={`/quiz/${categoryID}/quizset3`}>Quiz Set 3</Link></li>
      </ul>
    </div>
  );
};

export default CategoryPage;

