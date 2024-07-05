"use client"; 
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { ScreenWrapper } from '../ScreenWrapper';
import { Button } from '../ui/button';

const QuizCard = ({ quiz }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="bg-violet-50">
    <section>
     <ScreenWrapper className='pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-40'>
            <div className='flex flex-col'>
                <div className="flex mb-10 lg:justify-start justify-center space-x-4">
                    <Button className='h-[52px] text-xl shadow-md ring-2 ring-blue-500' variant="outline">Difficulty: {quiz.tags.difficulty}</Button>
                    <Button className='h-[52px] text-xl shadow-md ring-2 ring-pink-500' variant="outline">Categories: {quiz.tags.categories.join(', ')}</Button>
                </div>
                
                <div>
                <ReactCardFlip flipDirection='vertical' isFlipped={flipped}>
                    <div 
                        className='bg-white h-[450px] rounded-xl shadow-lg relative bg-transparent mx-auto text-center flex flex-col 
                        items-center justify-between lg:items-start' 
                        onClick={handleFlip}
                    >
                        <div className="relative w-auto my-10 ml-10">
                            <h1 className="text-3xl mb-4">{quiz.question}</h1>
                        </div>
                
                        <ul className="flex-grow py-10 pl-10 text-xl space-y-2 text-left font-medium flex flex-col items-center justify-between sm:items-start">
                            {quiz.options.map((option, index) => (
                                <li className='flex gap-1.5 items-center text-left' key={index}>{option}</li>
                                ))}
                        </ul>
                        
                    </div>

                    <div 
                        className='bg-white h-[450px] rounded-xl shadow-lg relative bg-transparent mx-auto text-center flex flex-col 
                        items-center justify-between lg:items-start' 
                        onClick={handleFlip}
                    >
                        <div className="relative w-fit my-10 ml-10">
                            <h1 className="text-3xl mb-4">Answer</h1>
                        </div>
                        <div className="flex-grow my-10 ml-10 text-2xl space-y-2 text-left font-medium flex flex-col items-center justify-center sm:items-start">
                        <h1> {quiz.correctAnswer}</h1>
                        <h3 className="text-xl mb-2">Explanation:{quiz.explanation} </h3>
                        </div>
                    </div>
                </ReactCardFlip>
                </div>
                
                <div className="flex mt-10 lg:justify-start justify-center space-x-4">
                <Button className='h-[52px] text-xl shadow-md' variant="outline">Like 👍</Button>
                </div>
            </div>
        </ScreenWrapper>
     </section>
    </div>
  );
};

export default QuizCard;
