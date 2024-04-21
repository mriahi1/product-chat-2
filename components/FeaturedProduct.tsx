import React, { useState, useEffect } from "react";
import { Product } from "@/types/Product";
import { useTranslation } from "@/contexts/TranslationsContext";

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
  count: number;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = (props) => {
  const [product, setProduct] = useState<Product>({} as Product);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { t } = useTranslation();

  useEffect(() => {
    setSelectedImage(props?.images[0]);
    setProduct(props);
  }, [props]);

  const {
    id,
    title,
    rating,
    url,
    price,
    description,
    images,
    distributor,
    countryOfOrigin,
    manufacturer,
    count,
  } = props;

  if (!product || !product?.images) {
    return <div>{t?.("loading_product")}</div>;
  }

  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  return (
    <div className="featured-product">
      <div className="selectionBanner">SÉLECTION #{count}</div>
      <div className="container">
        <div className="content flex flex-col md:flex-row">
          <div className="imageContainer w-full md:w-1/2">
            <img src={images[0]} alt={title} className="image" />
          </div>
          <div className="details w-full md:w-1/2">
            <div
              className="titleSection"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <h2 className="title">{truncateText(title, 50)}</h2>
                <hr className="divider" />
              </div>
              <div>
                <p className="price">{price.toFixed(2)} €</p>
                <a target="_blank" href={url} className="visitShopButton">
                  {t?.("visit_shop")}
                </a>
              </div>
            </div>
            <div className="descriptionContainer">
              <p className="descriptionTitle">{t?.("about_this_item")}</p>
              <p className="description">{description}</p>
              <p className="productDetails">
                <span className="productDetailsTitle">
                  {t?.("product_details")}{" "}
                </span>
                <br />
                <span className="product_attributes">
                  {t?.("distributor")}: {distributor}{" "}
                </span>
                <span className="product_attributes">
                  {t?.("country_of_origin")}: {countryOfOrigin}{" "}
                </span>
                <span className="product_attributes">
                  {t?.("manufacturer")}: {manufacturer}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
