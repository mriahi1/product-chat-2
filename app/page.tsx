"use client";
import React, { useState } from "react";
import { Product } from "@/interfaces/constants";

import ChatBot from "@/components/ChatBot";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductsList from "@/components/ProductsList";
import ProductPage from "@/components/ProductPage";
// import SimilarProducts from '@/components/SimilarProducts';
// import AlternativeProducts from '@/components/AlternativeProducts';
import RecommendedProducts from "@/components/RecommendedProducts";
import translations from "@/translations";
import {
  combinedProducts,
  similarProductsData,
  alternativeProductsData,
} from "./sample_data"; 
import { TranslationsProvider } from "@/contexts/TranslationsContext";

const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    combinedProducts[0]
  );
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const t = (key: string) =>
    (translations[language] as { [key: string]: string })[key] as string;

  const updateSelectedProduct = (product: Product) => {
    setSelectedProduct(product);
  };

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
            productData={combinedProducts}
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
            similarProducts={similarProductsData}
            secondhandProducts={alternativeProductsData}
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
