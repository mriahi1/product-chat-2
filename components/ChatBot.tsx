import React, { useState, useEffect, useRef } from "react";
import { Product } from "@/types/Product";
import { ChatMessage } from "@/types/ChatMessage";
import { useTranslation } from "@/contexts/TranslationsContext";
import { chatBotConfig } from '@/config';

interface ChatBotProps {
  onProductSelect?: (product: Product) => void;
  onProductsUpdate?: (products: Product[]) => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onProductSelect, onProductsUpdate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const suggestions = [
    { title: t("find_me"), subtitle: t('for_my_dog') },
    { title: t('find_a_deal'), subtitle: t('for_iphone_earphones') },
    { title: t('i_need'), subtitle: t('an_iphone_charger')  },
    // ... add more suggestions as needed
  ];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messages.length > 8) {
      chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetProductSelect = () => {
    if (onProductsUpdate) {
      setMessages([]);
      onProductsUpdate([])
      // onProductSelect([]);
      // onProductSelect();
    }
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const getRecommendedProduct = async (userInput: string) => {
    const lowerCaseUserInput = userInput.toLowerCase();
    let products;

    let mockProductData = async () => {
      return await import('@/data/mockProductData').then((module) => module.mockProductData());
    }

    products = await mockProductData();

    const foundProduct = products.find((product) =>
      product.title.toLowerCase().includes(lowerCaseUserInput)
    );

    return {
      product: foundProduct,
      products: products,
      message: foundProduct ? `${t('here_is_what_i_found')}: ${foundProduct.title}` : t("nothing_found")
    };
  };

  const sendMessage = (message: string) => {
    if (message.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", content: message.trim() },
    ]);

    setIsBotThinking(true);
  };

  const fetchApiData = async (searchTerm: string) => {
    try {
      const response = await fetch(`/api/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: searchTerm }),
      });
  
      if (!response.ok) {
        throw new Error('API response not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching from API:', error);
      return null;
    }
  };
  
  const performSearch = async (searchTerm: string) => {
    setIsBotThinking(true);
    sendMessage(searchTerm);
    setInputMessage("");

    let product: any;
    let products: any;
    let message: any;

    let responseData: any;
    if (false && chatBotConfig.useApi) {
      responseData = await fetchApiData(searchTerm);
      if (responseData.recommendation.length !== 0) {
        // Convert API response to Product array
        const recommendations: Product[] = responseData.recommendation.map((p: any) => ({
          id: parseInt(p.id, 10), 
          title: p.title,
          description: p.description,
          images: [p.image],
          price: p.price,
          url: p.url,
          rating: p.rating,
          distributor: p.distributor,
          countryOfOrigin: p.country_of_origin,
          manufacturer: p.manufacturer
        }));
        products = recommendations
        product = recommendations[0]
      }

      message = product ? `${t('here_is_what_i_found')}: ${product.title}` : t("nothing_found")
    } else {
      responseData = await getRecommendedProduct(searchTerm); 
      product = responseData.product
      products = responseData.products
      message = responseData.message
    }
  
    setTimeout(() => {
      if (responseData) {
        onProductSelect && onProductSelect(product);
        addBotMessage(message);
        onProductsUpdate && onProductsUpdate(products); // Update product list
      } else {
        addBotMessage(message);
      }
      setIsBotThinking(false);
    }, 1500);
  };

  const addBotMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", content: message },
    ]);
  };

  const handleSendMessage = () => {
    performSearch(inputMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    performSearch(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (isBotThinking) {
      const timer = setTimeout(() => {
        setIsBotThinking(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isBotThinking]);

  return (
    <>
    <div className={`chat-container component flex flex-col p-3 ${messages?.length > 0 ? 'chat-with-products' : ''}`}>
      <div
        ref={chatContainerRef}
        className="overflow-y-auto p-3 space-y-2"
        style={{ height: "calc(100vh - 350px)" }}
      >
        {messages.length === 0 && !isBotThinking ? (
          <>
            <p className="text-gray-900 font-bold mb-4">{t?.("chat_title")}</p>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.title + " " + suggestion.subtitle)}
                className="text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition ease-in-out duration-150 w-full text-left"
              >
                {suggestion.title}
                <div className="text-gray-500 text-sm">
                  {suggestion.subtitle}
                </div>
              </button>
            ))}
          </>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`break-words p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-gray-300 text-gray-800 align-left mb-2"
                  : "bg-blue-500 text-white align-right mb-2"
              }`}
            >
              {message.content}
            </div>
          ))
        )}
        {isBotThinking && (
          <div className="break-words p-3 bg-blue-500 text-white align-right rounded-lg mb-2">
            {t?.("chat_loading")}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-300 p-2 flex items-center space-x-2">
        <input
          type="text"
          placeholder={t('message_placeholder')}
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSendMessage}
          className="flex-none text-gray-500 p-2 focus:outline-none"
        >
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
      <button
        onClick={handleResetProductSelect}
        className="flex-none text-gray-500 p-2 focus:outline-none"
      >
        {t?.('start_over')}
      </button>
    </div>
    
  </>
  );
};

export default ChatBot;

