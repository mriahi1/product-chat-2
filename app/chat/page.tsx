"use client";
import React, { useState } from "react";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import ChatBot from "@/components/ChatBot";
import ProductFeed from "@/components/ProductFeed";
import Header from "@/components/Header";
import { TranslationProvider } from "@/contexts/TranslationsContext";
import GettingStarted from "@/components/GettingStarted";
import Footer from "@/components/Footer";


const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const updateSelectedProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const updateProducts = (products: Product[]) => {
    setProducts(products);
  }

  const updateCategories = (categories: Category[]) => {
    setCategories(categories);
  }

  return (
    <TranslationProvider>

      <div className="container">
        <Header />

        <main
          className={`page-section flex flex-col md:flex-row`}
        >
          {categories && categories.length > 0 ? (
            <>
              <aside className="w-full md:w-4/12 h-full">
                <GettingStarted step={2} />
              </aside>

              <section className="w-full md:w-8/12">
                <ProductFeed 
                  products={products} 
                  categories={categories} 
                  onProductsUpdate={updateProducts} 
                  onCategoriesUpdate={updateCategories}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories} />
              </section>
            </>
          ) : (
            <>
              <aside className="w-full md:w-6/12">
                <GettingStarted step={1} />
              </aside>
              <aside className="w-full md:w-6/12 p-t-4">
                <ChatBot
                  onProductSelect={updateSelectedProduct}
                  onProductsUpdate={updateProducts}
                  onCategoriesUpdate={updateCategories}
                  selectedCategories={selectedCategories}
                />

              </aside>
            </>
          )}
        </main>
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default Home;
