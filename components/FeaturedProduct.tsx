"use client";
// components/FeaturedProduct.tsx
import React, { useState } from 'react';

interface FeaturedProductProps {
  title: string;
  images: string[]; // Array of image URLs
  rating: number; // Rating value out of 5
  description: string;
  price: number;
  distributor: string;
  countryOfOrigin: string;
  manufacturer: string;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({
  title,
  images,
  rating,
  description,
  price,
  distributor,
  countryOfOrigin,
  manufacturer,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col items-center bg-white p-5 rounded-lg shadow-md w-full">
      <div className="flex md:flex-row flex-col items-center">
        <div className="flex flex-col space-y-2 mb-4 md:mb-0 md:mr-4">
          {images.map((img, index) => (
            <button key={index} onClick={() => handleThumbnailClick(img)}>
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded ${selectedImage === img ? 'border-2 border-blue-500' : ''}`}
              />
            </button>
          ))}
        </div>
        <img
          src={selectedImage}
          alt="Selected Product"
          className="w-full md:w-64 h-64 object-contain mb-4 md:mb-0"
        />
      </div>
      <h3 className="text-xl font-semibold my-2">{title}</h3>
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-yellow-400 text-xl">{index < rating ? '★' : '☆'}</span>
        ))}
      </div>
      <button 
        className="my-3 bg-blue-600 text-white px-6 py-2 rounded-full focus:outline-none hover:bg-blue-700 transition duration-300 ease-in-out"
        onClick={() => window.open('https://www.amazon.com', '_blank')}
      >
        Visit Shop
      </button>
      <p className="text-gray-600 text-center mb-2">{description}</p>
      <p className="text-lg font-bold mb-2">${price}</p>
      <div className="text-sm text-gray-500">
        <p className="font-bold">Product Details</p>
        <p>Distributor: {distributor}</p>
        <p>Country of Origin: {countryOfOrigin}</p>
        <p>Manufacturer: {manufacturer}</p>
      </div>
    </div>
  );
};

export default FeaturedProduct;
