import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";

export default function Education() {
  const educationData = [
    {
      degree: "Bachelor of Engineering - Computer Science",
      institution: "Bannari Amman Institute of Technology",
      period: "2021 - 2025",
      status: "Completed",
      grade: "CGPA: 7.1",
      specialization: "COMPUTER SCIENCE AND ENGINEERING"
    },
    {
      degree: "Higher Secondary Education (12th Grade)",
      institution: "Senthil Public School",
      period: "2020 - 2021",
      status: "Completed",
      grade: "Score: 79%"
    },
    {
      degree: "Secondary Education (10th Grade)",
      institution: "Kailash Maansarovar School",
      period: "2018 - 2019",
      status: "Completed",
      grade: "Score: 82.5%"
    }
  ];

  const certifications = [
    {
      title: "The Data Analyst Course: Complete Data Analyst Bootcamp",
      provider: "Udemy",
      status: "In Progress"
    },
    {
      title: "Data Analytics Corporate Training Program",
      provider: "TECHTIP-24",
      status: "In Progress"
    }
  ];

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-education-title">
            Education Journey
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Education Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20"></div>
            
            <div className="space-y-8">
              {educationData.map((edu, index) => (
                <div 
                  key={edu.degree} 
                  className={`timeline-item premium-card relative pl-20 p-6`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  data-testid={`education-card-${index}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10"></div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground" data-testid={`education-degree-${index}`}>
                        {edu.degree}
                      </h3>
                      <p className="text-primary font-medium" data-testid={`education-institution-${index}`}>
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right mt-2 lg:mt-0">
                      <Badge 
                        variant={edu.status === "Completed" ? "default" : "secondary"}
                        data-testid={`education-status-${index}`}
                      >
                        {edu.status}
                      </Badge>
                      <p className="text-muted-foreground text-sm mt-1" data-testid={`education-period-${index}`}>
                        {edu.period}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-primary/10 text-primary" data-testid={`education-grade-${index}`}>
                      {edu.grade}
                    </Badge>
                    {edu.specialization && (
                      <div className="text-muted-foreground">
                        <span className="text-sm" data-testid={`education-specialization-${index}`}>
                          {edu.specialization}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
            ))}
          </div>
          </div>
          
          {/* Certifications */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-foreground mb-8 text-center" data-testid="text-certifications-title">
              Ongoing Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card key={cert.title} className="card-hover" data-testid={`certification-card-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Tag className="w-6 h-6 text-primary" />
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        {cert.status}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2" data-testid={`certification-title-${index}`}>
                      {cert.title}
                    </h4>
                    <p className="text-muted-foreground text-sm" data-testid={`certification-provider-${index}`}>
                      {cert.provider}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
