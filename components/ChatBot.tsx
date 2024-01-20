import React, { useState, useEffect, useRef } from "react";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import { ChatMessage } from "@/types/ChatMessage";
import { useTranslation } from "@/contexts/TranslationsContext";
import { chatBotConfig } from "@/config";

interface ChatBotProps {
  onProductSelect?: (product: Product) => void;
  onProductsUpdate?: (products: Product[]) => void;
  onCategoriesUpdate?: (categories: Category[]) => void;
  selectedCategories?: Category[];
}

const generateSessionId = () => {
  // Simple unique ID generator - replace with your preferred method
  return 'session_' + Math.random().toString(36).substr(2, 9);
};

const ChatBot: React.FC<ChatBotProps> = ({
  onProductSelect,
  onProductsUpdate,
  onCategoriesUpdate,
  selectedCategories,
}) => {
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [selectionCount, setSelectionCount] = useState(0);
  const [selectedSearchCategories, setSelectedSearchCategories] = useState<
    Category[]
  >([]);
  const [searchPrompt, setSearchPrompt] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    let storedSessionId = localStorage.getItem('chatbotSessionId');
    if (!storedSessionId) {
      storedSessionId = generateSessionId();
      localStorage.setItem('chatbotSessionId', storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  const suggestions = [
    { title: t("hello"), subtitle: t("what_are_you_looking_for") },
    { title: t("find_me"), subtitle: t("for_my_dog") },
    { title: t("find_a_deal"), subtitle: t("for_iphone_earphones") },
    { title: t("i_need"), subtitle: t("an_iphone_charger") },
    // ... add more suggestions as needed
  ];

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current && messages.length > 5) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addBotCategoryMessages = (categories: Category[]) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", content: t("new_categories_found") },
    ]);

    const topFiveCategories = categories.slice(0, 5);
    const categoryMessages: ChatMessage[] = topFiveCategories.map(category => ({
      sender: "bot",
      content: category.name,
      category: category
    }));

    setMessages((prevMessages) => [...prevMessages, ...categoryMessages]);
  };

  const handleCategoryClick = (category: Category) => {
    if (selectionCount >= 1) {
      window.open(category.amazon_url, "_blank");
    } else {
      setSelectionCount((prevCount) => prevCount + 1);
      // performSearch(category.name);
      setSelectedSearchCategories((prevCategories) => [
        ...prevCategories,
        category,
      ]);
    }
  };

  const handleResetProductSelect = () => {
    if (onProductsUpdate) {
      setMessages([]);
      onProductsUpdate([]);
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
    let categories;

    let mockProductData = async () => {
      return await import("@/data/mockProductData").then((module) =>
        module.mockProductData()
      );
    };

    let mockCategoryData = async () => {
      return await import("@/data/mockCategoryData").then((module) =>
        module.mockCategoryData()
      );
    };

    products = await mockProductData();
    categories = await mockCategoryData();

    const foundProduct = products.find((product) =>
      product.title.toLowerCase().includes(lowerCaseUserInput)
    );

    return {
      product: foundProduct,
      products: products,
      categories: categories,
      message: foundProduct
        ? `${t("here_is_what_i_found")}: ${foundProduct.title}`
        : t("nothing_found"),
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

  const fetchApiData = async (searchTerm: string, actionType: string) => {
    try {
      // /api/recommendations
      const response = await fetch(`/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          prompt: {
            prompt: searchTerm,
          },
          prompt_type: {
            prompt_type: actionType,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("API response not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching from API:", error);
      return null;
    }
  };

  const performSearch = async (searchTerm: string, actionType: string) => {
    setIsBotThinking(true);
    sendMessage(searchTerm);
    setInputMessage("");

    let apiSearchPrompt = searchPrompt;

    if (!searchPrompt.includes(searchTerm)) {
      apiSearchPrompt = searchTerm;
      setSearchPrompt(apiSearchPrompt);
    }

    // let product: any;
    // let products: any;
    let message: any;
    let categories: any;
    let responseData: any;

    if (chatBotConfig.useApi) {
      try {
        responseData = await fetchApiData(apiSearchPrompt, actionType);
        if (responseData && responseData.status === 500) {
          message = t("error_message_generic");
        } else {
          if (responseData.category.length !== 0) {
            categories = responseData.category;
          }
          message = categories?.length
            ? `${t("here_is_what_i_found")}`
            : t("nothing_found");
        }
      } catch (error) {
        message = t("error_message_network"); // Replace 'error_message_network' with the translation key for network error messages
      }
      message = categories?.length
        ? `${t("here_is_what_i_found")}`
        : t("nothing_found");
    } else {
      responseData = await getRecommendedProduct(searchTerm);
      // product = responseData.product
      // products = responseData.products
      categories = responseData.categories;
      message = responseData.message;
    }

    setTimeout(() => {
      if (responseData && responseData.status !== 500) {
        if (responseData?.category) {
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
    }, 500);
  };

  const addBotMessage = (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", content: message },
    ]);
  };

  const handleSendMessage = () => {
    setSelectionCount(0);
    performSearch(inputMessage, "prompt");
  };

  useEffect(() => {
    if (selectedSearchCategories && selectedSearchCategories.length > 0) {
      const categoryNames = selectedSearchCategories
        .map((category: Category) => category.name)
        .join("+");

      const newSearchTerm = `${searchPrompt} +${categoryNames}`.trim();

      setSearchPrompt(newSearchTerm);
      performSearch(
        selectedSearchCategories[selectedSearchCategories.length - 1].name,
        "category"
      );
    }
  }, [selectedSearchCategories]);

  const handleSuggestionClick = (suggestion: any) => {
    performSearch(suggestion.title + " " + suggestion.subtitle, "prompt");
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
      }, 4000);

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
              <p className="text-gray-900 font-bold mb-4">
                {t?.("chat_title")}
              </p>
              {suggestions.map((suggestion, index) =>
                index === 0 ? (
                  <div
                    key={index}
                    className={`break-words p-3 rounded-lg message-bot bubble text-white align-right mb-2`}
                  >
                    {suggestion.title} {suggestion.subtitle}
                  </div>
                ) : (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`suggestion-button break-words p-3 rounded-lg text-gray-500 align-right mb-2`}
                  >
                    {suggestion.title} {suggestion.subtitle}
                  </button>
                )
              )}
            </>
          ) : (
            <div className="category-messages-container">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`break-words p-3 rounded-lg bubble mb-2 ${
                    message.sender === "user"
                      ? "message-content message-user bubble-right text-gray-800 align-left"
                      : "message-content message-bot text-white align-right"
                  } ${message.category ? "category-message" : ""}`}
                >
                  {message.category ? (
                    <button
                      onClick={() =>
                        message.category &&
                        handleCategoryClick(message.category)
                      }
                      className="category-button"
                    >
                      {message.content}
                    </button>
                  ) : (
                    message.content
                  )}
                </div>
              ))}
            </div>
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
            placeholder={t("message_placeholder")}
            className="message-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={120}
          />
          <button onClick={handleSendMessage} className="send-button">
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

      {messages?.length > 1 && (
        <p
          onClick={handleResetProductSelect}
          className="flex-none text-gray-500 p-2 focus:outline-none reset-button"
        >
          {t?.("start_over")}
        </p>
      )}
    </>
  );
};

export default ChatBot;
