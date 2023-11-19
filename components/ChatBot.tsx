import React, { useState, useEffect, useRef } from 'react';
import { Product } from '@/types/Product';
import { ChatMessage } from '@/types/ChatMessage';
import { useTranslations } from '@/contexts/TranslationsContext';


interface ChatBotProps {
  onProductSelect?: (product: Product) => void;
  productData: Product[];
}

const suggestions = [
  { title: 'Gift Ideas', subtitle: 'For my mother' },
  { title: 'Find good deal', subtitle: 'For computer monitor under 200€' },
  { title: 'Suggest jewelry', subtitle: 'that is locally sourced' },
  // ... add more suggestions as needed
];

const ChatBot: React.FC<ChatBotProps> = ({ onProductSelect, productData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const translations = useTranslations();
  const t = translations?.t;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRecommendedProduct = (userInput: string): Product | undefined => {
    const lowerCaseUserInput = userInput.toLowerCase();
    return productData.find((product) =>
      product.title.toLowerCase().includes(lowerCaseUserInput)
    );
  };

  const sendMessage = (message: string) => {
    if (message.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', content: message.trim() },
    ]);

    setIsBotThinking(true);
  };

  const performSearch = (searchTerm: string) => {
    sendMessage(searchTerm);
    setInputMessage('');
    const recommendedProduct = getRecommendedProduct(searchTerm);
    if (recommendedProduct && onProductSelect) {
      onProductSelect(recommendedProduct);
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
      <div className="overflow-y-auto p-3 space-y-2" style={{ height: 'calc(100vh - 350px)' }}>
        {messages.length === 0 && !isBotThinking ? (
          <>
            <p className="text-gray-900 font-bold mb-4">{t?.('chat_title')}</p>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.title)}
                className="text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition ease-in-out duration-150 w-full text-left"
              >
                {suggestion.title}
                <div className="text-gray-500 text-sm">{suggestion.subtitle}</div>
              </button>
            ))}
          </>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`break-words p-3 rounded-lg ${
                message.sender === 'user' ? 'bg-gray-300 text-gray-800 align-left mb-2' : 'bg-blue-500 text-white align-right mb-2'
              }`}
            >
              {message.content}
            </div>
          ))
        )}
        {isBotThinking && (
          <div className="break-words p-3 bg-blue-500 text-white align-right rounded-lg mb-2">
            {t?.('chat_loading')}
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
        />
        <button onClick={handleSendMessage} className="flex-none text-gray-500 p-2 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
