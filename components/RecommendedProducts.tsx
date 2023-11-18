import React from 'react';

interface Product {
  id: number;
  title: string;
  rating: number;
  price: number;
  imageUrl: string;
}

interface RecommendedProductsProps {
  similarProducts: Product[];
  secondhandProducts: Product[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  similarProducts,
  secondhandProducts,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Similar Products</h2>
        {similarProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between border-b border-gray-200 py-3">
            <img src={product.imageUrl} alt="" className="w-12 h-12 bg-gray-200 rounded" />
            <div className="flex-grow px-4">
              <div className="font-semibold">{product.title}</div>
              <div className="text-yellow-400">{product.rating} ★</div>
            </div>
            <div className="font-semibold">${product.price}</div>
          </div>
        ))}
        <button className="text-blue-600 py-2">more</button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Secondhand Alternatives</h2>
        {secondhandProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between border-b border-gray-200 py-3">
            <img src={product.imageUrl} alt="" className="w-12 h-12 bg-gray-200 rounded" />
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
