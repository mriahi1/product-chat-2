"use client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { TranslationProvider } from "@/contexts/TranslationsContext";
import Footer from "@/components/Footer";
import FeaturedPosts from "@/components/blog/FeaturedPosts";

const Home: React.FC = () => {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <TranslationProvider>
      {/* {loading && (
        <div className="loading-screen">
          <img src={"LOGO_FETCHIZY_BASELINE.png"} alt="Logo" />
        </div>
      )} */}

      <div className="container">
        <Header />
        <main>
          <HeroSection />
          <FeaturedPosts />
        </main>
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default Home;
