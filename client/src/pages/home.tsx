import Navbar from "@/components/navigation/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Education from "@/components/sections/education";
import Contact from "@/components/sections/contact";
import FloatingResumeButton from "@/components/ui/floating-resume-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <FloatingResumeButton />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground">&copy; 2026 Akshay S. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <a 
                href="https://github.com/Akki-333" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-github-footer"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/ak445" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-linkedin-footer"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a 
                href="mailto:akkies445@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-email-footer"
              >
                <i className="fas fa-envelope text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
