import { useEffect, useRef } from "react";
import { Search, Users, TrendingUp, Database, Code, Cpu, Bug, Brain, Settings, Github } from "lucide-react";

interface SkillCircleProps {
  skill: string;
  level: string;
  percentage: number;
  icon: any;
}

function SkillCircle({ skill, level, percentage, icon: Icon }: SkillCircleProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && circleRef.current) {
            setTimeout(() => {
              if (circleRef.current) {
                const offset = circumference - (percentage / 100) * circumference;
                circleRef.current.style.strokeDashoffset = `${offset}`;
              }
            }, 200);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => observer.disconnect();
  }, [percentage, circumference]);

  return (
    <div className="flex flex-col items-center p-6 glass-morphism rounded-xl card-hover">
      <div className="relative mb-4">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(59, 130, 246, 0.1)"
            strokeWidth="8"
            fill="transparent"
            className="opacity-30"
          />
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            className="transition-all duration-2000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(221, 83%, 53%)" />
              <stop offset="100%" stopColor="hsl(230, 81%, 60%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
          {percentage}%
        </div>
      </div>
      <h4 className="font-semibold text-foreground text-center mb-1">{skill}</h4>
      <p className="text-primary text-sm font-medium">{level}</p>
    </div>
  );
}

export default function Skills() {
  const technicalSkills = [
    { skill: "Troubleshooting & Debugging", level: "Strong", percentage: 90, icon: Bug },
    { skill: "Power BI", level: "Strong", percentage: 85, icon: TrendingUp },
    { skill: "SQL", level: "Strong", percentage: 80, icon: Database },
    { skill: "Python", level: "Strong", percentage: 75, icon: Code },
    { skill: "C Programming", level: "Intermediate", percentage: 70, icon: Cpu },
    { skill: "Java", level: "Intermediate", percentage: 65, icon: Code },
    { skill: "Web Development", level: "Intermediate", percentage: 60, icon: Code },
    { skill: "Jupyter Notebook", level: "Intermediate", percentage: 65, icon: Brain },
    { skill: "MS Excel", level: "Strong", percentage: 85, icon: TrendingUp },
    { skill: "GitHub", level: "Intermediate", percentage: 75, icon: Github },
  ];

  const competencies = [
    {
      icon: Search,
      title: "Problem Solving",
      description: "Analytical thinking and systematic approach to complex challenges"
    },
    {
      icon: Database,
      title: "SQL & Database Management",
      description: "Database design, optimization, and complex query development"
    },
    {
      icon: Settings,
      title: "Technical Troubleshooting",
      description: "Systematic problem diagnosis and resolution across various systems"
    },
    {
      icon: Database,
      title: "Data Analytics",
      description: "Data extraction, analysis, and visualization expertise"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-skills-title">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="space-y-16">
          {/* Technical Skills */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center" data-testid="text-technical-skills">
              Technical Skills
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technicalSkills.map((skill, index) => (
                <div 
                  key={skill.skill} 
                  className="skill-circle-container"
                  style={{ '--delay': index } as React.CSSProperties}
                  data-testid={`skill-circle-${index}`}
                >
                  <SkillCircle {...skill} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Core Competencies */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center" data-testid="text-core-competencies">
              Core Competencies
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {competencies.map((competency, index) => (
                <div 
                  key={competency.title}
                  className="glass-morphism p-6 rounded-xl card-hover text-center"
                  data-testid={`competency-card-${index}`}
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <competency.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-3">{competency.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{competency.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
