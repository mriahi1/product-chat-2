"use client";
import React, { useState } from "react";
import { Product } from "@/types/Product";
import ChatBot from "@/components/ChatBot";
// import FeaturedProduct from "@/components/FeaturedProduct";
import ProductFeed from "@/components/ProductFeed";
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
          className={`page-section flex flex-col md:flex-row ${
            selectedProduct ? "" : "justify-center"
          }`}
        >
          {products && products.length > 0 ? (
            <>
              <aside className="w-full md:w-3/12 h-full">
                <ChatBot
                  onProductSelect={updateSelectedProduct}
                  onProductsUpdate={updateProducts}
                />
                
              </aside>

              <section className="w-full md:w-5/12">
                {/* <FeaturedProduct {...selectedProduct} /> */}
                <ProductFeed products={products} />
              </section>

              {/* {products && products.length > 0 && (
              <aside className="w-full md:w-3/12 p-4">
                <RecommendedProducts
                  products={products}
                  onProductSelect={updateSelectedProduct}
                />
              </aside>
              )} */}
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
