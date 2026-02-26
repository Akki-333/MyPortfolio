import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ChevronDown, ExternalLink } from "lucide-react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Hero() {
  const scrollToSection = useSmoothScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  const roles = [
    "Tech Enthusiast",
    "Passionate Data Analyst"
  ];
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePos({
        x: (clientX - centerX) / centerX * 10, // Limit to 10px movement
        y: (clientY - centerY) / centerY * 10
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const roleInterval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  return (
    <section id="home" className="min-h-screen hero-aurora flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-in">
          {/* Profile image with glow effect */}
          <div className="mb-8 flex justify-center">
            <div 
              className="parallax-container"
              style={{
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
              }}
            >
              <div className="w-48 h-48 avatar-glow border-4 border-white/30 shadow-2xl">
                <img 
                  src="/profile.png" 
                  alt="Akshay S - Profile Picture"
                  className="w-full h-full object-cover rounded-full"
                  data-testid="img-profile"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 text-glow" data-testid="text-hero-name">
            Akshay S
          </h1>
          <div className="text-xl sm:text-2xl text-primary-foreground/90 mb-8 text-glow role-rotator" aria-live="polite">
            <span 
              className="role-text role-gradient-text active" 
              data-testid={`text-hero-role-${currentRoleIndex}`}
            >
              {roles[currentRoleIndex]}
            </span>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-12 leading-relaxed" data-testid="text-hero-description">
            Calm and detail-oriented professional who excels under pressure and communicates with clarity and confidence. Brings strong skills in problem-solving, system design, and machine learning to create innovative solutions and efficient operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/resume.pdf" 
              className="cta-primary magnetic-hover inline-flex items-center justify-center"
              data-testid="button-view-work"
              download
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Download Resume
            </a>
            <button 
              onClick={() => scrollToSection("projects")}
              className="cta-secondary magnetic-hover"
              data-testid="button-get-in-touch"
            >
              View My Work
            </button>
          </div>
          
          {/* Social Icons */}
          <div className="social-icons">
            <a 
              href="#" 
              className="social-icon" 
              data-testid="icon-social-github"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="social-icon" 
              data-testid="icon-social-linkedin"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contact@akshays.dev" 
              className="social-icon" 
              data-testid="icon-social-email"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Floating Tech Chips - Decorative */}
        <div className="tech-chip tech-chip-1" data-testid="chip-tech-powerbi" aria-hidden="true">Power BI</div>
        <div className="tech-chip tech-chip-2" data-testid="chip-tech-sql" aria-hidden="true">SQL</div>
        <div className="tech-chip tech-chip-3" data-testid="chip-tech-python" aria-hidden="true">Python</div>
        <div className="tech-chip tech-chip-4" data-testid="chip-tech-github" aria-hidden="true">GitHub</div>
        
        {/* Scroll Indicator */}
        <button 
          className="scroll-indicator" 
          onClick={() => scrollToSection("about")}
          data-testid="indicator-scroll"
          aria-label="Scroll to About section"
        >
          <span className="text-sm font-medium">Scroll</span>
          <ChevronDown className="scroll-arrow" />
        </button>
      </div>
    </section>
  );
}
