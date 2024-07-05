"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();

  const sendMessage = async() => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
      const userInput = input;
      setInput('');

      try{
        //send question to backend
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chatbot`, { question: input });
        const botResponse = response.data.answer;
        //set answer
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
      }catch(error){
        console.error("Error fetching chatbot response:", error);
        setMessages((prevMessages) => [...prevMessages, { text: 'Error: Could not fetch response', sender: 'bot' }]);
      }
      setInput('');
      // setTimeout(() => {
      //   setMessages((prevMessages) => [...prevMessages, { text: 'This is a bot response.', sender: 'bot' }]);
      // }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handlePowerClick = () => {
    router.back();
  };

  return (
    <div className="w-full h-screen bg-violet-50 flex flex-col items-center justify-center relative">
      <div className="w-full lg:max-w-2xl bg-white rounded-xl shadow-lg p-6 relative">
        <div className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/Component.png" alt="Chatbot Icon" className="w-6 h-6" />
            <h2 className="text-xl font-bold">Chatbot - Ask me!</h2>
          </div>
          <button className="text-red-500" onClick={handlePowerClick}>
            <img src="/power.png" alt="Close Icon" className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto h-96 mb-4 flex flex-col space-y-4" id="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.sender === 'user' ? 'bg-purple-600 text-white self-end' : 'bg-gray-300 text-black self-start'
              }`}
              style={{ display: 'inline-block', maxWidth: '80%', wordBreak: 'break-word' }}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-center relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your message"
            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-200 rounded-md py-2 pr-12"
          />
          <button className="absolute right-3" onClick={sendMessage}>
            <img src="/send.png" alt="Send Icon" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;