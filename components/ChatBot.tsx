"use client";
import React, { useState, useEffect, useRef } from 'react';
import {ChatMessage, ChatBotProps, Product} from '@/interfaces/constants';


const ChatBot: React.FC<ChatBotProps> = ({ onProductSelect, productData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getRecommendedProduct = (userInput: string): Product | undefined => {
    userInput = userInput.toLowerCase(); 

    const recommendedProduct = productData.find((product) =>
      product.title.toLowerCase().includes(userInput)
    );
    return recommendedProduct;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isBotThinking) {
      const timer = setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', content: "Here's what I found" },
        ]);
        setIsBotThinking(false);
      }, 1000); // Bot "thinks" for 1 second

      return () => clearTimeout(timer);
    }
  }, [isBotThinking]);

  const sendMessage = (message: string) => {
    if (message.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', content: message.trim() }
    ]);

    setIsBotThinking(true);
  };

  const performSearch = (searchTerm: string) => {
    sendMessage(searchTerm);
    setInputMessage('');
    const recommendedProduct = getRecommendedProduct(searchTerm);
    if (recommendedProduct) {
      if (onProductSelect) {
        onProductSelect(recommendedProduct);
      }
    }
  };

  const handleSendMessage = () => {
    performSearch(inputMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    performSearch(suggestion);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
      <div className="overflow-y-auto p-3 space-y-2" style={{ height: 'calc(100vh - 350px)' }}> {/* Adjusted for chatbot size and input area */}
        {messages.length === 0 && !isBotThinking ? (
          <>
            <p className="text-gray-900 font-bold mb-4">What are you looking for today?</p>
            <button
              onClick={() => handleSuggestionClick('Gift Ideas')}
              className="text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition ease-in-out duration-150 w-full text-left"
            >
              Gift Ideas
            </button>
            <button
              onClick={() => handleSuggestionClick('Find good deal')}
              className="text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition ease-in-out duration-150 w-full text-left"
            >
              Find good deal
            </button>
          </>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`break-words p-3 rounded-lg ${message.sender === 'user' ? 'bg-gray-300 text-gray-800 align-left mb-2' : 'bg-blue-500 text-white align-right mb-2'}`}>
              {message.content}
            </div>
          ))
        )}
        {isBotThinking && (
          <div className="break-words p-3 bg-blue-500 text-white align-right rounded-lg mb-2">
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-300 p-2 flex items-center space-x-2 bg-white">
        <input
          type="text"
          placeholder="Message Product Chat ..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="flex-none text-gray-500 p-2 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
