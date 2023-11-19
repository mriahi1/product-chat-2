// services/ApiService.ts
import { Product } from '@/types/Product';
import { env } from 'process';

const API_ENDPOINT = env.API_ENDPOINT || 'https://fakestoreapi.com/products'
const API_TOKEN = env.API_TOKEN || 'fake-token'

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    // Return mock data or an empty array as fallback
    return []; 
  }
};
