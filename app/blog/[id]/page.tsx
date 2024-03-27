"use client";
import React from "react";
import type { NextPage } from "next";
import Header from "@/components/Header";
import { TranslationProvider } from "@/contexts/TranslationsContext";
import Footer from "@/components/Footer";
import BlogPost from "@/components/blog/BlogPost";


const PostDetail: NextPage = () => {

  return (
    <TranslationProvider>
      <div className="container" style={{ marginTop: "100px" }}>
        <Header />
        <main className={`flex flex-col md:flex-row`}>
          <BlogPost />
        </main>
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default PostDetail;
