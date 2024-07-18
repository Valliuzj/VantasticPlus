"use client";
import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@radix-ui/react-checkbox';

const QuizNowCard = ({ quiz, onAnswerSubmit, feedback, onNextQuestion, onLike, isButtonDisabled }) => {
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

  return (
    <div className="bg-violet-50">
      <section>
        <ScreenWrapper className='pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-40'>
          <div className='flex flex-col items-center'>
            {/**top part */}
            <div className="flex mb-10 justify-center space-x-4">
              <Button className='h-[52px] text-xl shadow-md ring-2 ring-blue-500' variant="outline">Difficulty: {quiz.difficulty}</Button>
              <Button className='h-[52px] text-xl shadow-md ring-2 ring-pink-500' variant="outline">Category: {quiz.category}</Button>
            </div>

            {/**card part */}
            <div className="w-full">
              <ReactCardFlip flipDirection='vertical' isFlipped={flipped}>
                {/**front*/}
                <div 
                  className='bg-white h-[450px] rounded-xl shadow-lg relative mx-auto text-center flex flex-col 
                  items-center justify-center p-6' 
                >
                  <div className="relative w-auto my-10">
                    <h1 className="text-3xl font-bold text-violet-800">{quiz.question}</h1>
                  </div>

                  <ul className="flex-grow py-4 text-xl space-y-4 text-left font-medium flex flex-col">
                    {quiz.choices.map((choice, index) => (
                      <li 
                        className='flex gap-1.5 justify-start' 
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

                  <div className="flex justify-between items-center w-auto px-6">
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isButtonDisabled}
                      className='mx-6 text-xl text-white bg-blue-500 hover:bg-blue-600'>
                        Submit</Button>
                    <Button 
                      onClick={onLike} 
                      disabled={isButtonDisabled}
                      className='mx-6 text-xl text-white bg-rose-500 hover:bg-rose-600'>
                        Like👍</Button>
                  </div>
                </div>

                {/**back*/}
                <div 
                  className='bg-white h-[450px] rounded-xl shadow-lg relative mx-auto text-center flex flex-col 
                  items-center justify-center p-6' 
                >
                  <div className="relative w-fit mt-10">
                    <h1 className="text-3xl font-bold text-violet-800 mb-5">Answer</h1>
                    <h1 className="text-2xl font-bold text-rose-500">{quiz.choices[quiz.answer]}</h1>
                  </div>
                  <div className="flex-grow text-2xl space-y-4 text-left font-medium flex flex-col items-center justify-center">
                    {feedback && <h2 className={`text-2xl font-bold ${selectedAnswer === quiz.answer ? 'text-green-600' : 'text-blue-500'}`}>{feedback}</h2>}
                  </div>
                </div>
              </ReactCardFlip>
            </div>
            <div className="flex justify-center mt-4">
                     <Button onClick={handleNext} className='h-[52px] text-xl shadow-md text-white  bg-rose-400 hover:bg-rose-600'>Next Question!</Button>
              </div>
      

          </div>
        </ScreenWrapper>
     
      </section>
    </div>
  );
};

export default QuizNowCard;
