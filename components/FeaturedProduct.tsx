
import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { mockProductData } from "@/data/mockProductData";
import { useTranslations } from '@/contexts/TranslationsContext';


interface FeaturedProductProps {
  id: number;
  title: string;
  images: string[];
  rating: number;
  description: string;
  price: number;
  distributor: string;
  countryOfOrigin: string;
  manufacturer: string;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = (props) => {
  const [useMockData, setUseMockData] = useState(true);
  const [product, setProduct] = useState<Product>({} as Product);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const translations = useTranslations();
  const t = translations?.t;

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    const getMockData = async () => {
      const mockData = await mockProductData();
      setProduct(mockData[0]);
      setSelectedImage(mockData[0].images[0]);
      setIsLoading(false);
    };

    getMockData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          "https://your-api-endpoint.com/products/featured",
          {
            headers: {
              Authorization: "Bearer YOUR_API_TOKEN",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Product = await response.json();
        setProduct(data);
        setSelectedImage(data.images[0]);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setProduct(product);
        setSelectedImage(product.images[0]);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      if (!useMockData) {
        fetchProduct();
      }
    }, 2000);

  }, [useMockData]);

  if (isLoading || !product || !product.images) {
    return <div>{t?.('loading_product')}</div>;
  }

  const {
    title,
    rating,
    price,
    description,
    images,
    distributor,
    countryOfOrigin,
    manufacturer,
  } = product;

  const renderRating = (value: number, icon: string, color: { active: string, inactive: string }) => (
    <>
      <div className="flex items-center mr-4">
        {value}
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
  

  const renderCTA = () => (
    <div className="flex justify-between items-center w-full">
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-full focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={() => window.open("https://www.amazon.com", "_blank")}
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
      <div className="bg-white p-5 rounded-lg shadow-md w-full flex">
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
              {renderRating(4.8, '★', { active: 'text-yellow-500', inactive: 'text-gray-300' })}
              
              {renderRating(3.8, '+', { active: 'text-green-500', inactive: 'text-gray-300' })}
              {/* {renderRating("eco")} */}
              {renderCTA()}
              
            </div>
            <hr className="border-t border-gray-300 my-2" />
            <div className="flex justify-between items-center w-full my-2">
              <h4 className="text-lg font-semibold text-left">
              {t?.('about_this_item')}
              </h4>
              {formatPrice(price, "€")}
            </div>
            <p className="text-gray-600 text-left mb-2">{description}</p>
            <dl className="text-sm text-gray-500 text-left">
              <h4 className="text-lg font-semibold">{t?.('product_details')}</h4>
              <dt className="font-bold mt-2">{t?.('distributor')}:</dt>
              <dd>{distributor}</dd>
              <dt className="font-bold mt-2">{t?.('country_of_origin')}:</dt>
              <dd>{countryOfOrigin}</dd>
              <dt className="font-bold mt-2">{t?.('manufacturer')}:</dt>
              <dd>{manufacturer}</dd>
            </dl>
          </div>
        </div>
      </div>

      <button onClick={() => setUseMockData(!useMockData)}>
      {t?.('Toggle data source')}
      </button>
    </div>
  );
};

export default FeaturedProduct;
