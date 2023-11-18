// components/SimilarProducts.tsx
import React from 'react';

interface Product {
  id: string;
  title: string;
  rating: number;
  price: number;
}

interface SimilarProductsProps {
  products: Product[];
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
  <h3 className="text-lg font-semibold mb-2">Similar Products</h3>
  <ul>
    {products.map((product) => (
      <li key={product.id} className="py-2 border-b last:border-b-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/path-to-product-image.jpg" alt={product.title} className="h-12 w-12 rounded-full mr-4" />
            <div>
              <h4 className="text-md font-medium">{product.title}</h4>
              {/* Star ratings */}
            </div>
          </div>
          <div>
            <span className="text-md font-semibold">${product.price}</span>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>
  );
};

export default SimilarProducts;
