// import axios from 'axios';

const placeholderImage = '/images/products/jewelry/1.png'; // Update with actual path or static URL
const placeholderImage2 = '/images/products/jewelry/2.png'; // Update with actual path or static URL
const placeholderImage3 = '/images/products/jewelry/3.png'; // Update with actual path or static URL

// Mock data generation
const generateMockCategories = (count: number) => {
    const mockProducts = [];
  
    for (let i = 1; i <= count; i++) {
      mockProducts.push({
        id: i,
        title: `Jewelry ${i}`,
        description: `Description of Jewelry ${i} for increased sales conversations on e-commerce site`,
      });
    }
  
    return mockProducts;
  };


export const mockCategoryData = async () => {
    try {
      // Generate 10 mock products
      const predefinedData = generateMockCategories(5);
      return predefinedData;
    } catch (error) {
      console.error('Error:', error);
      return []; // Return an empty array in case of error
    }
  };
