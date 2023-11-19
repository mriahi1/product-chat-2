"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { mockProductData } from "@/data/mockProductData";

import ChatBot from "@/components/ChatBot";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductPage from "@/components/ProductPage";
import RecommendedProducts from "@/components/RecommendedProducts";
import translations from "@/translations";
import {
  combinedProducts,
} from "./sample_data"; 
import { TranslationsProvider } from "@/contexts/TranslationsContext";


const Home: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const t = (key: string) =>
    (translations[language] as { [key: string]: string })[key] as string;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const similarProducts = products.slice(0, 3);
  const alternativeProducts = products.slice(3, 6);

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

  return (
    <TranslationsProvider>
    <div className="container mx-auto my-8">
      <header className="flex justify-between items-center p-4 header">
        <div className="logo">
          <h1>{t("logo")}</h1>
        </div>
        <div className="profile">
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
          />
        </aside>
      </main>

      <main className="flex flex-col md:flex-row">
        {/* <aside className="w-full md:w-6/12 p-4">
          <ProductsList />
        </aside> */}
        <aside className="w-full md:w-6/12 p-4">
          <ProductPage />
        </aside>
      </main>

      <footer className="p-4">{/* Footer content here */}</footer>
    </div>
    </TranslationsProvider>
  );
  
};

export default Home;
