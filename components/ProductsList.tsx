// components/ProductsList.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { fetchProducts } from '../services/ApiService';

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  if (products.length === 0) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          {/* Render other product details as needed */}
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
