// import axios from 'axios';

// Predefined local or static URLs for placeholder images
const placeholderImage = '/images/products/jewelry/1.png'; // Update with actual path or static URL
const placeholderImage2 = '/images/products/jewelry/2.png'; // Update with actual path or static URL
const placeholderImage3 = '/images/products/jewelry/3.png'; // Update with actual path or static URL

export const mockProductData = async () => {
    // Using predefined mock data for fast and attractive placeholders
    /**
     * Predefined product data used for increased sales conversations.
     */
    const predefinedData = [
        {
            id: 1,
            title: "Jewelry 1",
            description: "Description of Jewelry 1 for increased sales conversations on e-commerce site",
            images: [placeholderImage, placeholderImage2, placeholderImage3],
            price: 50,
            rating: 4.8,
            distributor: "Amazon",
            countryOfOrigin: "Spain",
            manufacturer: "Spanish Factory 1",
        },
        // ... more predefined products
    ];

    try {
        // If you still want to fetch external images, do it here
        // Consider caching the response for reusability

        // Return predefined data
        return predefinedData;
    } catch (error) {
        console.error('Error:', error);

        // Return predefined data even in case of error
        return predefinedData;
    }
};
