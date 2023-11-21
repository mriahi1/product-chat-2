
import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { useTranslation } from '@/contexts/TranslationsContext';

interface FeaturedProductProps {
  id: number;
  title: string;
  images: string[];
  rating: number;
  url: string;
  description: string;
  price: number;
  distributor: string;
  countryOfOrigin: string;
  manufacturer: string;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = (props) => {
  const [product, setProduct] = useState<Product>({} as Product);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { t } = useTranslation();

  useEffect(() => {
    // Update selected image when the images array changes
    setSelectedImage(props?.images[0]);
    setProduct(props);
  }, [props]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  const {
    title,
    rating,
    url,
    price,
    description,
    images,
    distributor,
    countryOfOrigin,
    manufacturer,
  } = props;

  if (!product || !product?.images) {
    return <div>{t?.('loading_product')}</div>;
  }

  const renderRating = (value: number, icon: string, color: { active: string, inactive: string }) => (
    <>
      <div className="flex items-center mr-4">
        {value.toFixed(1)}
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`text-xl ${
                index < Math.round(value) ? color.active : color.inactive
              }`}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </>
  );
  

  const renderCTA = (url: string) => (
    <div className="flex justify-between items-center w-full">
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-full focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={() => window.open(url, "_blank")}
      >
        {t?.('visit_shop')}
      </button>
    </div>
  );

  const formatPrice = (price: number, currency: string) => {
    const [whole, decimal] = price.toFixed(2).split(".");
    return (
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">{currency}{whole}</span>
        <span className="text-sm font-normal">.{decimal}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="component p-5 w-full flex">
        <div className="flex flex-col space-y-2 mr-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(img)}
              className={`w-16 h-16 object-cover rounded ${
                selectedImage === img
                  ? "ring-2 ring-blue-500"
                  : "ring-1 ring-gray-300"
              }`}
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

          <div style={{ marginLeft: "-80px" }}>
            <h3 className="text-3xl font-bold my-2 text-left">{title}</h3>
            <div className="flex justify-between items-center w-full">
              {renderRating(product.rating, '★', { active: 'text-yellow-500', inactive: 'text-gray-300' })}
              
              {renderRating(product.rating, '+', { active: 'text-green-500', inactive: 'text-gray-300' })}
              {/* {renderRating("eco")} */}
              {renderCTA(product.url)}
              
            </div>
            <hr className="border-t border-gray-300 my-2" />
            <div className="flex justify-between items-center w-full my-2">
              <h4 className="text-lg font-semibold text-left">
              {t?.('about_this_item')}
              </h4>
              {formatPrice(price, "€")}
            </div>
            <p className="text-gray-600 text-left mb-2">{description}</p>
            <dl className="text-sm text-gray-500">
              <h4 className="text-lg font-semibold">{t?.('product_details')}</h4>
              <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between">
                <div className="flex">
                  <dt className="font-bold mt-2 mr-1">{t?.('distributor')}:</dt>
                  <dd className="mt-2">{distributor}</dd>
                </div>
                <div className="flex">
                  <dt className="font-bold mt-2 mr-1">{t?.('country_of_origin')}:</dt>
                  <dd className="mt-2">{countryOfOrigin}</dd>
                </div>
                <div className="flex">
                  <dt className="font-bold mt-2 mr-1">{t?.('manufacturer')}:</dt>
                  <dd className="mt-2">{manufacturer}</dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
{/* 
      <button onClick={() => setUseMockData(!useMockData)}>
      {t?.('toggle_data_source')}
      </button> */}
    </div>
  );
};

export default FeaturedProduct;
