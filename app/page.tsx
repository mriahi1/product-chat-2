import ChatBot from '@/components/ChatBot';
import FeaturedProduct from '@/components/FeaturedProduct';
// import SimilarProducts from '@/components/SimilarProducts';
// import AlternativeProducts from '@/components/AlternativeProducts';
import RecommendedProducts from '@/components/RecommendedProducts';

const Home: React.FC = () => {

  const productDetails = {
    title: 'Featured Product Title',
    images: [
      'https://via.placeholder.com/640x480?text=Product+Image+1', // Replace with your real image URLs
      'https://via.placeholder.com/640x480?text=Product+Image+2',
      'https://via.placeholder.com/640x480?text=Product+Image+3',
      // Add more as needed
    ],
    description: 'This is a description of the featured product. It is very interesting and you should buy it!',
    price: 33.00,
    rating: 4.6,
    distributor: 'Amazon Inc',
    countryOfOrigin: 'Romania',
    manufacturer: 'XYZ Inc.',
  };
  

  const similarProductsData = [
    { id: 1, title: 'Similar Product 1 Title', rating: 4.8, price: 33.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Similar Product 2 Title', rating: 4.8, price: 33.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Similar Product 3 Title', rating: 4.8, price: 33.00, imageUrl: 'https://via.placeholder.com/150' },
  ];
  
  const alternativeProductsData = [
    { id: 101, title: 'Alt Product 1 Title', rating: 4.8, price: 33.00, imageUrl: 'https://via.placeholder.com/150' },
    { id: 102, title: 'Alt Product 2 Title', rating: 4.8, price: 33.00, imageUrl: 'https://via.placeholder.com/150' },
    // ... more products
  ];

  return (
    <div className="container mx-auto my-8">
      <header className="flex justify-between items-center p-4 header">
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <div className="profile">
          <h1>Profile</h1>
        </div>
      </header>
      
      <main className="flex flex-col md:flex-row">
        <aside className="w-full md:w-3/12 p-4">
          <ChatBot />
        </aside>
        
        <section className="w-full md:w-5/12 p-4">
          <FeaturedProduct {...productDetails} />
        </section>

        <aside className="w-full md:w-4/12 p-4">
          <RecommendedProducts 
            similarProducts={similarProductsData}
            secondhandProducts={alternativeProductsData}
          />
        </aside>
      </main>

      <footer className="p-4">
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default Home;