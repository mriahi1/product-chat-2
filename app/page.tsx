"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { mockProductData } from "@/data/mockProductData";
import ChatBot from "@/components/ChatBot";
import FeaturedProduct from "@/components/FeaturedProduct";
import RecommendedProducts from "@/components/RecommendedProducts";
import Header from "@/components/Header";
import { TranslationProvider, useTranslation } from "@/contexts/TranslationsContext";

const Home: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  
  const [inputMessage, setInputMessage] = useState<string>("");
  // const { t, language, setLanguage } = useTranslation();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const getSimilarProducts = (products: Product[]): Product[] => {
    return products.slice(0, 3);
  };

  const getAlternativeProducts = (products: Product[]): Product[] => {
    return products.slice(3, 6);
  };

  const handleOverlaySubmit = (searchTerm: string) => {
    setShowOverlay(false);
  };

  const similarProducts = getSimilarProducts(products);
  const alternativeProducts = getAlternativeProducts(products);

  useEffect(() => {
    const loadMockData = async () => {
      const data = await mockProductData();
      setProducts(data);
      // setSelectedProduct(data[0]);
    };

    loadMockData();
  }, []);

  const updateSelectedProduct = (product: Product) => {
    setSelectedProduct(product);
  };


  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const searchTerm = inputMessage.trim().toLowerCase();
    const searchResults = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    setShowOverlay(false);
  };

  return (
    <TranslationProvider>
      

      <div className="container">
        <Header />

        <main
          className={`flex flex-col md:flex-row ${
            selectedProduct ? "" : "justify-center"
          }`}
        >
          {selectedProduct ? (
            <>
              <aside className="w-full md:w-3/12 p-4 h-full">
                <ChatBot
                  productData={products}
                  onProductSelect={updateSelectedProduct}
                />
                
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
            </>
          ) : (
            <>
              <aside className="w-full md:w-6/12 p-4">
                <ChatBot
                  productData={products}
                  onProductSelect={updateSelectedProduct}
                />
              
              </aside>
            </>
          )}
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

      

      {/* Overlay for initial search */}
      {showOverlay && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex justify-center items-center p-4">
          <div className="w-full max-w-lg p-5 bg-gray-700 rounded-lg">
            <h2 className="text-xl text-white mb-4">
              {/* {t?.("searching_for_products")} */}
            </h2>
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <label
                htmlFor="searchInput"
                className="block text-sm font-medium text-gray-200"
              >
                {/* {t?.("search_explainer")} */}
              </label>
              <input
                id="searchInput"
                type="text"
                placeholder={t?.("search_placeholder")}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {t?.("search")}
              </button>
            </form>
          </div>
        </div>
      )}

    </TranslationProvider>
  );
};

export default Home;
