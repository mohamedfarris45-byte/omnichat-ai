import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>UniChat - Unified Telegram & Discord Chat with AI</title>
        <meta
          name="description"
          content="Unify your Telegram and Discord conversations with AI-powered message analysis, summarization, and smart response generation."
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Features />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
