"use client";
import React, { useState } from "react";
import { Product } from "@/types/Product";
import ChatBot from "@/components/ChatBot";
import FeaturedProduct from "@/components/FeaturedProduct";
import RecommendedProducts from "@/components/RecommendedProducts";
import Header from "@/components/Header";
import { TranslationProvider } from "@/contexts/TranslationsContext";
import GettingStarted from "@/components/GettingStarted";
import LegalNotice from "@/components/LegalNotice";
import AffiliationStatement from '@/components/AffiliationStatement';

const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const updateSelectedProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const updateProducts = (products: Product[]) => {
    setProducts(products);
  }

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
                  onProductSelect={updateSelectedProduct}
                  onProductsUpdate={updateProducts}
                />
                
              </aside>

              <section className="w-full md:w-5/12 p-4">
                <FeaturedProduct {...selectedProduct} />
              </section>

              <aside className="w-full md:w-4/12 p-4">
                <RecommendedProducts
                  products={products}
                  onProductSelect={updateSelectedProduct}
                />
              </aside>
            </>
          ) : (
            <>
              <aside className="w-full md:w-6/12 p-4">
                <ChatBot
                  onProductSelect={updateSelectedProduct}
                  onProductsUpdate={updateProducts}

                />
              
              </aside>
              <aside className="w-full md:w-3/12 p-4">
                <GettingStarted />
              
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

        <footer>
          <LegalNotice />
          <AffiliationStatement />
        </footer>
      </div>
    </TranslationProvider>
  );
};

export default Home;
