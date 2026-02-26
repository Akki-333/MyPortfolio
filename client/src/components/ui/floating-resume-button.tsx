import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FloatingResumeButton() {
  const { toast } = useToast();

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

  return (
    <div className="floating-resume">
      <a 
        href="/resume.pdf"
        download="Akshay_S_Resume.pdf"
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        data-testid="button-floating-resume"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">Latest Resume</span>
      </a>
    </div>
  );
}
