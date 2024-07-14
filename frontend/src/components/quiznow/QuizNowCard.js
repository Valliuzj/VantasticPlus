"use client";
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Button } from '@/components/ui/button';

const QuizNowCard = ({ quiz, onAnswerSubmit, feedback, onNextQuestion, onLike }) => {
  const [flipped, setFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(parseInt(event.target.value, 10));
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      onAnswerSubmit(selectedAnswer);
      setFlipped(true);
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setSelectedAnswer(null);
    onNextQuestion();
  };

  if (!quiz || !quiz.choices || !quiz.category || !quiz.difficulty || !quiz.question || !quiz.answer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-violet-50">
      <section>
        <ScreenWrapper className='pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-40'>
          <div className='flex flex-col items-center'>
            <div className="flex mb-10 justify-center space-x-4">
              <Button className='h-[52px] text-xl shadow-md ring-2 ring-blue-500' variant="outline">Difficulty: {quiz.difficulty}</Button>
              <Button className='h-[52px] text-xl shadow-md ring-2 ring-pink-500' variant="outline">Category: {quiz.category}</Button>
            </div>

            <div className="w-full">
              <ReactCardFlip flipDirection='vertical' isFlipped={flipped}>
                <div 
                  className='bg-white h-[450px] rounded-xl shadow-lg relative mx-auto text-center flex flex-col 
                  items-center justify-center p-6' 
                >
                  <div className="relative w-auto my-14">
                    <h1 className="text-3xl mb-4 break-words">{quiz.question}</h1>
                  </div>

                  <ul className="flex-grow py-10 text-xl space-y-4 text-left font-medium flex flex-col items-center justify-center">
                    {quiz.choices.map((choice, index) => (
                      <li 
                        className='flex gap-1.5 items-center cursor-pointer' 
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                      >
                        <input 
                          type="radio" 
                          name="quiz-choice" 
                          value={index} 
                          checked={selectedAnswer === index} 
                          onChange={handleAnswerChange} 
                        />
                        {choice}
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center mt-4 w-full px-6">
                    <Button onClick={onLike} className='h-[52px] text-xl shadow-md' variant="outline">Like</Button>
                    <Button onClick={handleSubmit} className='h-[52px] text-xl shadow-md' variant="outline">Submit</Button>
                  </div>
                </div>

                <div 
                  className='bg-white h-[450px] rounded-xl shadow-lg relative mx-auto text-center flex flex-col 
                  items-center justify-center p-6' 
                >
                  <div className="relative w-fit my-10">
                    <h1 className="text-3xl mb-4">Answer</h1>
                  </div>
                  <div className="flex-grow my-10 text-2xl space-y-4 text-left font-medium flex flex-col items-center justify-center">
                    <h1>{quiz.choices[quiz.answer]}</h1>
                    <h3 className="text-xl mb-2">Explanation: {quiz.explanation}</h3>
                    {feedback && <h2 className="text-2xl font-bold text-green-600">{feedback}</h2>}
                  </div>
                </div>
              </ReactCardFlip>
            </div>
          </div>
        </ScreenWrapper>
        <div className="flex justify-center mt-4">
          <Button onClick={handleNext} className='h-[52px] text-xl shadow-md' variant="outline">Next ➡️</Button>
        </div>
      </section>
    </div>
  );
};

export default QuizNowCard;