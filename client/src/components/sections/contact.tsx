import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Linkedin, Github, Download } from "lucide-react";

import type { InsertContactMessage } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    },
  });

  const handleDownloadResume = async () => {
    try {
      const response = await fetch("/api/resume/download");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Akshay_S_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error("Failed to download resume");
      }
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Unable to download resume. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

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
        
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6" data-testid="text-lets-connect">
                Let's Connect
              </h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card key={info.label} className="p-4 card-hover" data-testid={`contact-info-${index}`}>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{info.label}</p>
                        {info.href ? (
                          <a 
                            href={info.href}
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
            
            {/* Resume Download */}
            <Card className="gradient-bg p-6 text-center" data-testid="card-resume-download">
              <h4 className="text-xl font-semibold text-primary-foreground mb-3">
                Download My Resume
              </h4>
              <p className="text-primary-foreground/90 mb-4">
                Get a detailed overview of my experience and skills
              </p>
              <Button 
                onClick={handleDownloadResume}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                data-testid="button-download-resume-section"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Resume (PDF)
              </Button>
            </Card>
          </div>
          
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <h3 className="text-2xl font-semibold text-foreground" data-testid="text-send-message">
                Send a Message
              </h3>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John" 
                              {...field}
                              data-testid="input-first-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Doe" 
                              {...field}
                              data-testid="input-last-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john.doe@example.com" 
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Let's work together" 
                            {...field}
                            data-testid="input-subject"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={5}
                            placeholder="Tell me about your project or opportunity..."
                            className="resize-none"
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit-contact"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
