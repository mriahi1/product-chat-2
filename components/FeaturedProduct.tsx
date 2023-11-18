"use client";
import React, { useState } from 'react';
import { Product } from '@/interfaces/constants';

const FeaturedProduct: React.FC<Product> = ({
  id,
  title,
  description,
  imageUrl,
  images,
  rating,
  price,
  distributor,
  countryOfOrigin,
  manufacturer,
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const renderStarRatingAndButton = () => (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`text-yellow-400 text-xl ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
        ))}
      </div>
      <button 
        className="bg-blue-500 text-white px-6 py-2 rounded-full focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={() => window.open('https://www.amazon.com', '_blank')}
      >
        Visit Shop
      </button>
    </div>
  );

  // Helper function to format price with currency and decimals
  const formatPrice = (price: number) => {
    const [whole, decimal] = price.toFixed(2).split('.');
    return (
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">${whole}</span>
        <span className="text-sm font-normal">.{decimal}</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full flex">
      <div className="flex flex-col space-y-2 mr-4">
        {images.map((img, index) => (
          <button 
            key={index} 
            onClick={() => handleThumbnailClick(img)} 
            className={`w-16 h-16 object-cover rounded ${selectedImage === img ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'}`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </button>
        ))}
      </div>
      <div className="flex-grow flex flex-col">
        <img
          src={selectedImage}
          alt="Selected Product"
          className="w-full h-auto object-cover mb-4"
        />

        <div style={{marginLeft:"-80px"}}>
          <h3 className="text-3xl font-bold my-2 text-left">{title}</h3>
          {renderStarRatingAndButton()}
          <hr className="border-t border-gray-300 my-2" /> {/* Visual separator */}
          <div className="flex justify-between items-center w-full my-2">
            <h4 className="text-lg font-semibold text-left">About this Item</h4>
            {formatPrice(price)}
          </div>
          <p className="text-gray-600 text-left mb-2">{description}</p>
          <dl className="text-sm text-gray-500 text-left">
            <h4 className="text-lg font-semibold">Product Details</h4>
            <dt className="font-bold mt-2">Distributor:</dt>
            <dd>{distributor}</dd>
            <dt className="font-bold mt-2">Country of Origin:</dt>
            <dd>{countryOfOrigin}</dd>
            <dt className="font-bold mt-2">Manufacturer:</dt>
            <dd>{manufacturer}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;

