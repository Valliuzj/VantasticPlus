"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAnswer('');

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chatbot`,
        { question }
      );

      if (response.status === 200) {
        setAnswer(response.data.answer);
      } else {
        setError('Failed to get answer from chatbot');
      }
    } catch (error) {
      console.error('Error fetching chatbot answer:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold mb-4">Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="question">Ask a question:</Label>
          <Input
            id="question"
            type="text"
            placeholder="Type your question here..."
            value={question}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Ask</Button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {answer && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold">Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
