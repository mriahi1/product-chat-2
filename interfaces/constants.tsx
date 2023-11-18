export interface Product {
  id: number;
  title: string;
  imageUrl: string;
  images: string[]; // Array of image URLs
  rating: number; // Rating value out of 5
  description: string;
  price: number;
  distributor: string;
  countryOfOrigin: string;
  manufacturer: string;
}

export interface ChatMessage {
  sender: "user" | "bot";
  content: string;
}

export interface ChatBotProps {
  onProductSelect?: (product: Product) => void;
  productData: Product[];
}

export interface RecommendedProductsProps {
  similarProducts: Product[];
  secondhandProducts: Product[];
}