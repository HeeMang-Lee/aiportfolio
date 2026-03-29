"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AIExperience from "@/components/AIExperience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Footer from "@/components/Footer";

function Skeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg flex items-center justify-center">
      <div className="space-y-8 w-full max-w-md px-6">
        <div className="h-4 w-24 skeleton rounded mx-auto" />
        <div className="h-12 w-48 skeleton rounded mx-auto" />
        <div className="h-4 w-72 skeleton rounded mx-auto" />
        <div className="h-4 w-64 skeleton rounded mx-auto" />
        <div className="flex gap-4 justify-center">
          <div className="h-10 w-10 skeleton rounded-xl" />
          <div className="h-10 w-10 skeleton rounded-xl" />
          <div className="h-10 w-10 skeleton rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton />;

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg">
      <Navigation />
      <Hero />
      <AIExperience />
      <Projects />
      <Skills />
      <About />
      <Footer />
    </main>
  );
}
