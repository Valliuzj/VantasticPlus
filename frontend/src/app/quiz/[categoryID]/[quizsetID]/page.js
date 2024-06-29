"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';

const QuizSetPage = () => {
  const params = useParams();
  const { categoryID, quizsetID } = params;

  if (!categoryID || !quizsetID) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Quizzes in Quiz Set {quizsetID} for Category {categoryID}</h1>
      <ul>
        <li><Link href={`/quiz/${categoryID}/${quizsetID}/quiz1`}>Quiz 1</Link></li>
        <li><Link href={`/quiz/${categoryID}/${quizsetID}/quiz2`}>Quiz 2</Link></li>
        <li><Link href={`/quiz/${categoryID}/${quizsetID}/quiz3`}>Quiz 3</Link></li>
      </ul>
    </div>
  );
};

export default QuizSetPage;

