"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { mockProductData } from "@/data/mockProductData";
import Modal from '@/components/Modal'; 
import ChatBot from "@/components/ChatBot";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductPage from "@/components/ProductPage";
import RecommendedProducts from "@/components/RecommendedProducts";
import translations from "@/translations";
// import {
//   combinedProducts,
// } from "./sample_data"; 
import { TranslationsProvider } from "@/contexts/TranslationsContext";


const Home: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [showSignupModal, setShowSignupModal] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [inputMessage, setInputMessage] = useState<string>("");
  const t = (key: string) =>
    (translations[language] as { [key: string]: string })[key] as string;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const getSimilarProducts = (products: Product[]): Product[] => {
    return products.slice(0, 3);
  };

  const getAlternativeProducts = (products: Product[]): Product[] => {
    return products.slice(3, 6);
  };

  const handleOverlaySubmit = (searchTerm: string) => {
    // Logic to handle the initial product search
    setShowOverlay(false);
    // Potentially trigger a search in the chatbot or elsewhere
  };

  const handleProfileClick = () => {
    setShowSignupModal(true);
  };

  const handleSignupSubmit = (userData: any) => {
    // Logic to handle user signup
    setShowSignupModal(false);
    // You might want to save userData or do something with it
  };

  const similarProducts = getSimilarProducts(products);
  const alternativeProducts = getAlternativeProducts(products);

  useEffect(() => {
    const loadMockData = async () => {
      const data = await mockProductData();
      setProducts(data);
      setSelectedProduct(data[0]);
    };

    loadMockData();
  }, []);

  const updateSelectedProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  if (!selectedProduct) {
    return <div>{t?.('loading')}</div>; // Loading state or placeholder
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submit action
    // Assuming inputMessage is the state used for handling input value
    const searchTerm = inputMessage.trim().toLowerCase();
    const searchResults = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
    // Handle the search logic, for example, updating state with the results
    // or calling a function to display the results
    // ...
    setShowOverlay(false); // Close the overlay after search
  };

  return (
    <TranslationsProvider>
      {/* Overlay for initial search */}
      {showOverlay && (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex justify-center items-center p-4">
        <div className="w-full max-w-lg p-5 bg-gray-700 rounded-lg">
          <h2 className="text-xl text-white mb-4">{t?.('searching_for_products')}</h2>
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <label htmlFor="searchInput" className="block text-sm font-medium text-gray-200">
              {t?.('search_explainer')}
            </label>
            <input
              id="searchInput"
              type="text"
              placeholder={t?.('search_placeholder')}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {t?.('search')}
            </button>
          </form>
        </div>
      </div>
    )}

      {/* Signup Modal */}
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          {/* Replace with your signup form */}
          <form>
            {/* Form fields */}
            <button type="submit">{t('signup')}</button>
          </form>
        </Modal>
      )}

    <div className="container mx-auto my-8">
      <header className="flex justify-between items-center p-4 header">
        <div className="logo">
          <h1>{t("logo")}</h1>
        </div>
       <div className="profile" onClick={handleProfileClick}>
          <h1>{t("search_history")}</h1>
        </div>
      </header>

      <main className="flex flex-col md:flex-row">
        <aside className="w-full md:w-3/12 p-4">
          <ChatBot
            productData={products}
            onProductSelect={updateSelectedProduct}
          />
          <button onClick={() => setLanguage(language === "en" ? "fr" : "en")}>
            {t("switch_language")}
          </button>
        </aside>

        <section className="w-full md:w-5/12 p-4">
          <FeaturedProduct {...selectedProduct} />
        </section>

        <aside className="w-full md:w-4/12 p-4">
          <RecommendedProducts
            similarProducts={similarProducts}
            alternativeProducts={alternativeProducts}
            onProductSelect={updateSelectedProduct}
          />
        </aside>
      </main>

      <main className="flex flex-col md:flex-row">
        {/* <aside className="w-full md:w-6/12 p-4">
          <ProductsList />
        </aside> */}
        {/* <aside className="w-full md:w-6/12 p-4">
          <ProductPage />
        </aside> */}
      </main>

      <footer className="p-4">{/* Footer content here */}</footer>
    </div>
    </TranslationsProvider>
  );
  
};

export default Home;
