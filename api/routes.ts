import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ success: false, message: "Failed to send message" });
    }
  });

  // Resume download endpoint
  app.get("/api/resume/download", (req, res) => {
    const resumePath = path.join(process.cwd(), "client", "public", "Akshay_Resume.pdf");
    res.download(resumePath, "Akshay_S_Resume.pdf", (err) => {
      if (err) {
        console.error("Resume download error:", err);
        res.status(404).json({ error: "Resume not found" });
      }
    });
  });

  // Serve resume file
  app.get("/api/resume", (req, res) => {
    const resumePath = path.join(process.cwd(), "client", "public", "Akshay_Resume.pdf");
    res.sendFile(resumePath, (err) => {
      if (err) {
        console.error("Resume serve error:", err);
        res.status(404).json({ error: "Resume not found" });
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
