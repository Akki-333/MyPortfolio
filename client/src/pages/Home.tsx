import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { About } from "@/components/sections/about/About";
import { Skills } from "@/components/sections/skills/Skills";
import { Projects } from "@/components/sections/projects/Projects";
import { Experience } from "@/components/sections/experience/Experience";
import { Certifications } from "@/components/sections/certifications/Certifications";
import { Contact } from "@/components/sections/contact/Contact";

export function Home() {
  return (
    <div className="page-canvas min-h-screen">
      <a href="#main" className="skip-link focus-ring">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
