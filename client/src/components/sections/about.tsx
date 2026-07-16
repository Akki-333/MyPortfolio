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
              I am a Computer Science graduate with hands-on experience across full-stack development, automation, and application security. Skilled at writing production-grade Python and SQL, debugging complex backend logic, and designing test workflows, I have a track record of working closely with engineering teams to deliver reliable, well-documented systems under deadline pressure.
            </p>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-about-description-2">
              My passion lies in leveraging data analytics and software development to solve real-world problems and create a meaningful impact.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-card p-4 rounded-lg border border-border" data-testid="card-current-focus">
                <h4 className="font-semibold text-foreground mb-2">Current Focus</h4>
                <p className="text-sm text-muted-foreground">Data Analytics & Machine Learning</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border" data-testid="card-experience">
                <h4 className="font-semibold text-foreground mb-2">Experience</h4>
                <p className="text-sm text-muted-foreground">Academic Projects & Certifications</p>
              </div>
            </div>
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
