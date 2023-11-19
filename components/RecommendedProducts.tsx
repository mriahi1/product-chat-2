import React from 'react';
import { RecommendedProductsProps } from '@/interfaces/constants';
import { useTranslations } from '@/contexts/TranslationsContext';

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  similarProducts,
  alternativeProducts,
}) => {
  const translations = useTranslations();
  const t = translations?.t;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">{t?.('similar_products')}</h2>
        {similarProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between border-b border-gray-200 py-3">
            <img src={product.images[0]} alt="" className="w-12 h-12 bg-gray-200 rounded" />
            <div className="flex-grow px-4">
              <div className="font-semibold">{product.title}</div>
              <div className="text-yellow-400">{product.rating} ★</div>
            </div>
            <div className="font-semibold">${product.price}</div>
          </div>
        ))}
        <button className="text-blue-600 py-2">{t?.('more')}</button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">{t?.('secondhand_alternatives')}</h2>
        {alternativeProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between border-b border-gray-200 py-3">
            <img src={product.images[Math.floor(Math.random() * 3)]} alt="" className="w-12 h-12 bg-gray-200 rounded" />
            <div className="flex-grow px-4">
              <div className="font-semibold">{product.title}</div>
              <div className="text-yellow-400">{product.rating} ★</div>
            </div>
            <div className="font-semibold">${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
