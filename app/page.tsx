import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Works />
        <About />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
