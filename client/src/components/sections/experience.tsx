import { Briefcase, Calendar } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      title: "Developer",
      company: "BDSR Solutions LLP",
      period: "Mar 2026 – Present",
      description: [
        "Gained solid experience from dynamic web applications, working across URL discovery, session management, pagination, HTML parsing, data transformation, and automated processing to build reliable, production-ready data workflows.",

        "Managed deployment and monitoring of scraping applications on remote Linux servers using SSH, PuTTY, and WinSCP, ensuring seamless execution, troubleshooting runtime issues, and maintaining reliable production environments.",

        "Progressed into a Full-Stack Developer role on Quantis, an enterprise performance management platform built using Flask and React, contributing to backend services, frontend modules, REST API integrations, dashboard development, and UI enhancements across multiple business features.",

        "Designed, implemented, and optimized backend logic supporting performance dashboards, agent scorecards, training modules, reporting workflows, and real-time metric visualization while diagnosing and resolving complex production issues across the application.",

        "Improved backend scalability by redesigning Python connection pooling and request-processing logic, enabling multiple companies to be processed efficiently through a single API session while significantly reducing execution time and resource consumption for our web scrapping of companies.",

        "Collaborated with teams for Git-based version control, code reviews, feature implementation, testing, production deployments, and continuous application improvements, strengthening expertise in full-stack engineering, debugging, automation, and scripting."
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-background section-bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-experience-title">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className="premium-card p-8 rounded-xl border border-border"
              data-testid={`experience-card-${index}`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg mt-1 hidden sm:block">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">{exp.title}</h3>
                    <p className="text-primary font-semibold text-lg">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full w-fit">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">{exp.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 text-muted-foreground">
                {exp.description.map((desc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
