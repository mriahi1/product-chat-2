"use client";
import React, { useState } from "react";
import { Product } from "@/types/Product";
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
          className={`page-section flex flex-col md:flex-row`}
        >
          {products && products.length > 0 ? (
            <>
              <aside className="w-full md:w-4/12 h-full">
                <GettingStarted step={2} />
              </aside>

              <section className="w-full md:w-8/12">
                {/* <FeaturedProduct {...selectedProduct} /> */}
                <ProductFeed products={products} onProductsUpdate={updateProducts} />
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
