import { GraduationCap, Award, Mail, Phone, Globe } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 bg-background section-bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-about-title">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground" data-testid="text-who-i-am">Who I Am</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-about-description-1">
              I am a Computer Science Engineering graduate and Software Developer with hands-on experience building production-grade applications, scalable backend systems, and end-to-end data solutions. My work spans full-stack development, backend engineering, web scraping, automation, REST API integration, and performance optimization, where I've contributed to designing reliable software that solves real business problems.
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-about-description-2">
              At BDSR Solutions, I evolved from developing Python-based web scraping pipelines to contributing to Quantis, an enterprise performance management platform built with Flask and React. Working on a live product has strengthened my understanding of software architecture, production debugging, deployment workflows, and building scalable systems that are both efficient and maintainable.
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-about-description-3">
              I enjoy understanding how software works beneath the surface, solving complex technical challenges, and continuously learning new technologies. My goal is to build impactful products that combine thoughtful engineering, data, and user-focused design to create meaningful real-world solutions.
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-xl border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6" data-testid="text-quick-facts">Quick Facts</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3" data-testid="fact-education">
                <GraduationCap className="text-primary w-5 h-5" />
                <span className="text-muted-foreground">B.E CSE - Bannari Amman Institute of Technology</span>
              </div>
              <div className="flex items-center gap-3" data-testid="fact-cgpa">
                <Award className="text-primary w-5 h-5" />
                <span className="text-muted-foreground">7.1 CGPA (Completed)</span>
              </div>
              <div className="flex items-center gap-3" data-testid="fact-email">
                <Mail className="text-primary w-5 h-5" />
                <span className="text-muted-foreground">akkies445@gmail.com</span>
              </div>
              <div className="flex items-center gap-3" data-testid="fact-phone">
                <Phone className="text-primary w-5 h-5" />
                <span className="text-muted-foreground">+91 8248316571</span>
              </div>
              <div className="flex items-center gap-3" data-testid="fact-languages">
                <Globe className="text-primary w-5 h-5" />
                <span className="text-muted-foreground">English (Fluent), Tamil (Native)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
