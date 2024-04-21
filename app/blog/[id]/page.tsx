"use client";
import React from "react";
import Header from "@/components/Header";
import { TranslationProvider } from "@/contexts/TranslationsContext";
import Footer from "@/components/Footer";
import BlogPost from "@/components/blog/BlogPost";
import HeroSection from "@/components/HeroSection";

const PostDetail: React.FC = () => {
  return (
    <TranslationProvider>
      {/* {loading && (
        <div className="loading-screen">
          <img src={"LOGO_FETCHIZY_BASELINE.png"} alt="Logo" />
        </div>
      )} */}
      <Header />
      <div className="container mb-10">
        <main>
          <HeroSection />
          <BlogPost />
        </main>
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default PostDetail;
