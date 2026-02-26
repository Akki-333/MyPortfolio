import { useState } from "react";
import { Menu } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToSection = useSmoothScroll();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 glass-morphism border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-primary" data-testid="text-logo">
              Akshay S
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleNavClick("home")}
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-home-nav"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick("about")}
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-about-nav"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick("skills")}
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-skills-nav"
              >
                Skills
              </button>
              <button 
                onClick={() => handleNavClick("projects")}
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-projects-nav"
              >
                Projects
              </button>
              <button 
                onClick={() => handleNavClick("education")}
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-education-nav"
              >
                Education
              </button>
              <button 
                onClick={() => handleNavClick("contact")}
                className="text-foreground hover:text-primary transition-colors"
                data-testid="link-contact-nav"
              >
                Contact
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
              data-testid="button-mobile-menu"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => handleNavClick("home")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                data-testid="link-home-mobile"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavClick("about")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                data-testid="link-about-mobile"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick("skills")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                data-testid="link-skills-mobile"
              >
                Skills
              </button>
              <button 
                onClick={() => handleNavClick("projects")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                data-testid="link-projects-mobile"
              >
                Projects
              </button>
              <button 
                onClick={() => handleNavClick("education")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                data-testid="link-education-mobile"
              >
                Education
              </button>
              <button 
                onClick={() => handleNavClick("contact")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
                data-testid="link-contact-mobile"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
