import { Card } from "@/components/ui/card";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "akkies445@gmail.com",
      href: "mailto:akkies445@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 8248316571",
      href: "tel:+918248316571"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/ak445",
      href: "https://www.linkedin.com/in/ak445"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Akki-333",
      href: "https://github.com/Akki-333"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background section-bg-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4" data-testid="text-contact-title">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-contact-description">
            I'm always open to discussing new opportunities, interesting projects, and collaborations. Feel free to reach out!
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 text-center">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6" data-testid="text-lets-connect">
                Let's Connect
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={info.label} className="p-6 card-hover" data-testid={`contact-info-${index}`}>
                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-primary text-primary-foreground p-4 rounded-full">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground mb-1">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
                            target={info.href.startsWith("http") ? "_blank" : undefined}
                            rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-primary hover:text-primary/80 transition-colors"
                            data-testid={`contact-link-${index}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
