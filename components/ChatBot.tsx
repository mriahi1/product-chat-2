import React, { useState, useEffect, useRef } from "react";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { ChatMessage } from "@/types/ChatMessage";
import { useTranslation } from "@/contexts/TranslationsContext";
import { chatBotConfig } from '@/config';

interface ChatBotProps {
  onProductSelect?: (product: Product) => void;
  onProductsUpdate?: (products: Product[]) => void;
  onCategoriesUpdate?: (categories: Category[]) => void;
  selectedCategories?: Category[];
}

const ChatBot: React.FC<ChatBotProps> = ({ onProductSelect, onProductsUpdate, onCategoriesUpdate, selectedCategories }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [selectionCount, setSelectionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const suggestions = [
    { title: t("hello"), subtitle: t('what_are_you_looking_for') },
    // { title: t('find_a_deal'), subtitle: t('for_iphone_earphones') },
    // { title: t('i_need'), subtitle: t('an_iphone_charger')  },
    // ... add more suggestions as needed
  ];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current && messages.length > 5) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } 
  };

  const addBotCategoryMessages = (categories: Category[]) => {

    const topThreeCategories = categories.slice(0, 3);
    const categoryMessages: ChatMessage[] = topThreeCategories.map(category => ({
      sender: "bot",
      content: category.name,
      category: category
    }));

    setMessages(prevMessages => [...prevMessages, ...categoryMessages]);
  };

  const handleCategoryClick = (category: Category) => {
    if (selectionCount >= 2) {
      window.open(category.amazon_url, '_blank');
    } else {
      setSelectionCount(prevCount => prevCount + 1);
      performSearch(category.name);
    }
  };


  // const handleResetProductSelect = () => {
  //   if (onProductsUpdate) {
  //     setMessages([]);
  //     onProductsUpdate([])
  //     // onProductSelect([]);
  //     // onProductSelect();
  //   }
  // };


  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const getRecommendedProduct = async (userInput: string) => {
    const lowerCaseUserInput = userInput.toLowerCase();
    let products;
    let categories;

    let mockProductData = async () => {
      return await import('@/data/mockProductData').then((module) => module.mockProductData());
    }

    let mockCategoryData = async () => {
      return await import('@/data/mockCategoryData').then((module) => module.mockCategoryData());
    }

    products = await mockProductData();
    categories = await mockCategoryData();

    const foundProduct = products.find((product) =>
      product.title.toLowerCase().includes(lowerCaseUserInput)
    );

    return {
      product: foundProduct,
      products: products,
      categories: categories,
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
      // /api/recommendations
      const response = await fetch(`/api/categories`, {
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

    // let product: any;
    // let products: any;
    let message: any;
    let categories: any;
    let responseData: any;

    if (true || messages.length > 0) {
      if (chatBotConfig.useApi) {
        responseData = await fetchApiData(searchTerm);
        if (responseData.category.length !== 0) {

          categories = responseData.category
          // Convert API response to Product array
          // const recommendations: Product[] = responseData.recommendation.map((p: any, index: number) => ({
          //   id: parseInt(p.id, 10), 
          //   title: p.title,
          //   description: p.description,
          //   images: [p.image],
          //   price: p.price,
          //   url: p.url,
          //   rating: p.rating,
          //   distributor: p.distributor,
          //   countryOfOrigin: p.country_of_origin,
          //   manufacturer: p.manufacturer,
          //   count: index + 1
          // }));
          // products = recommendations;
          // product = recommendations[0];
        }

        message = categories.length ? `${t('here_is_what_i_found')}` : t("nothing_found")
      } else {
        responseData = await getRecommendedProduct(searchTerm); 
        // product = responseData.product
        // products = responseData.products
        categories = responseData.categories
        message = responseData.message
      } 
    } else {
      message = t("could_you_be_more_specific")
    }

    // console.log('searchTerm', searchTerm, messages, message, categories, responseData)
  
    setTimeout(() => {
      if (responseData) {
        if (responseData.category) {
          addBotCategoryMessages(responseData.category);
        }
        // onProductSelect && onProductSelect(product);
        // onProductsUpdate && onProductsUpdate(products); // Update product list
        // addBotMessage(message);
        // onCategoriesUpdate && onCategoriesUpdate(categories);
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

  useEffect(() => {
    if (selectedCategories && selectedCategories.length > 0) {
      const categoryNames = selectedCategories.map((category: Category) => category.name).join("+");
      
      const newSearchTerm = `${inputMessage} +${categoryNames}`.trim();
      performSearch(newSearchTerm);
    }
  }, [selectedCategories]);


  // const handleSuggestionClick = (suggestion: string) => {
  //   performSearch(suggestion);
  // };

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
    <div className={`chat-container component flex flex-col p-3`}>
      <div
        ref={chatContainerRef}
        className="overflow-y-auto p-3 space-y-2"
        style={{ height: "calc(100vh - 350px)" }}
      >
        {messages.length === 0 && !isBotThinking ? (
           <>
           <p className="text-gray-900 font-bold mb-4">{t?.("chat_title")}</p>
           {suggestions.map((suggestion, index) => (
             <div
              key={index}
              className={`break-words p-3 rounded-lg message-bot bubble text-white align-right mb-2`}
            >
              {suggestion.title} {suggestion.subtitle}
            </div>
           ))}
         </>
        ) : (
          messages.map((message, index) => (

            <div key={index} className={`break-words p-3 rounded-lg bubble mb-2 ${message.sender === "user" ? "message-user bubble-right text-gray-800 align-left" : "message-bot text-white align-right"} ${message.category ? "category-message" : ""}`}>
              {message.category ? (
                <button onClick={() => message.category && handleCategoryClick(message.category)} className="category-button">
                  {message.content}
                </button>
              ) : (
                message.content
              )}
            </div>
          ))
        )}
        {isBotThinking && (
            <div className="loading-container">
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
          )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 flex items-center input-group">
        <input
          type="text"
          placeholder={t('message_placeholder')}
          className="message-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
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
      {/* <button
        onClick={handleResetProductSelect}
        className="flex-none text-gray-500 p-2 focus:outline-none"
      >
        {t?.('start_over')}
      </button> */}
    </div>
    
  </>
  );
};

export default ChatBot;

