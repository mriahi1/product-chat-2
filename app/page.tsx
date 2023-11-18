"use client";
import React, { useState } from 'react';
import { Product } from '@/interfaces/constants';

import ChatBot from '@/components/ChatBot';
import FeaturedProduct from '@/components/FeaturedProduct';
// import SimilarProducts from '@/components/SimilarProducts';
// import AlternativeProducts from '@/components/AlternativeProducts';
import RecommendedProducts from '@/components/RecommendedProducts';
import { productDetails, similarProductsData, alternativeProductsData } from './sample_data';


const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(productDetails);

  const updateSelectedProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const combinedProducts = [...similarProductsData, ...alternativeProductsData, productDetails];

  return (
    <div className="container mx-auto my-8">
      <header className="flex justify-between items-center p-4 header">
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <div className="profile">
          <h1>Search History</h1>
        </div>
      </header>
      
      <main className="flex flex-col md:flex-row">
        <aside className="w-full md:w-3/12 p-4">
          <ChatBot productData={combinedProducts} onProductSelect={updateSelectedProduct} />
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

      <footer className="p-4">
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default Home;