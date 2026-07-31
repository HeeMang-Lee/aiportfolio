import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AIExperience from "@/components/AIExperience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <AIExperience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
