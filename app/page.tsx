"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
import ChatBot from "@/components/ChatBot";
// import FeaturedProduct from "@/components/FeaturedProduct";
import ProductFeed from "@/components/ProductFeed";
// import RecommendedProducts from "@/components/RecommendedProducts";
import Header from "@/components/Header";
import { TranslationProvider } from "@/contexts/TranslationsContext";
import GettingStarted from "@/components/GettingStarted";
import LegalNotice from "@/components/LegalNotice";
import AffiliationStatement from '@/components/AffiliationStatement';


const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const updateSelectedProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const updateProducts = (products: Product[]) => {
    setProducts(products);
  }

  const updateCategories = (categories: Category[]) => {
    setCategories(categories);
  }

  // console.log('selectedCategories pages', selectedCategories)

  return (
    <TranslationProvider>

      {loading && (
        <div className="loading-screen">
          <img src={"LOGO_FETCHIZY_BASELINE.png"} alt="Logo" />
        </div>
      )}

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
                {/* <FeaturedProduct {...selectedProduct} /> */}
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

        <footer>
  <div className="footer-link">
    <LegalNotice />
  </div>
  <div className="footer-link">
    <AffiliationStatement />
  </div>
        </footer>
      </div>
    </TranslationProvider>
  );
};

export default Home;
