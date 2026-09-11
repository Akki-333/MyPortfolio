import type { ExperienceRole } from "@/types";

/**
 * Production career history, newest first.
 *
 * Each highlight pairs a short headline with the engineering detail behind it,
 * so the timeline reads as capability rather than as a task list. Client names
 * and internal identifiers are deliberately absent.
 */
export const experience: readonly ExperienceRole[] = [
  {
    company: "BDSR Solutions LLP",
    title: "Software Developer",
    period: "Mar 2026 — Present",
    location: "India",
    current: true,
    summary:
      "Evolved from building remote Python data extraction pipelines into full-stack platform engineering across multiple production products. Owned end-to-end backend microservices, real-time analytics dashboards, automated test suites, security audits, and the resilient data crawler infrastructure that powers them.",
    highlights: [
      {
        headline: "Resilient Web Data Extraction & Browser Automation",
        detail:
          "Built high-throughput headless crawlers using Python, Playwright, and asyncio to extract structured data from complex dynamic single-page applications. Handled tricky UI obstacles—including nested iframes, modal dialogs, cookie consent banners, and chat overlays—using DOM mutation observers and network request interception for maximum stability.",
      },
      {
        headline: "Fault-Tolerant Pipelines with Checkpointing & Auto-Resume",
        detail:
          "Engineered reliable pagination handlers for infinite scroll, offset windows, and popups with stateful checkpointing. If an extraction run is interrupted mid-process, it automatically resumes from the last saved state rather than restarting from scratch, saving compute time and guaranteeing zero data loss through real-time deduplication.",
      },
      {
        headline: "Full-Stack Development for Live Enterprise Platforms",
        detail:
          "Shipped features across two production systems: a performance management platform (Flask services on Azure Functions, automated ETL data processing, and React dashboards used daily by operations teams) and an internal knowledge hub (FastAPI backend with LangChain and FAISS vector indexing for semantic document search).",
      },
      {
        headline: "Automated API Testing, Debugging & Security Review",
        detail:
          "Investigated and resolved cross-stack production issues and data edge cases. Created comprehensive API regression and integration test suites to prevent breaking changes, and conducted security reviews focusing on role-based endpoint authorization, input sanitization, and schema validation.",
      },
      {
        headline: "Linux Production Operations & Task Scheduling",
        detail:
          "Deployed, automated, and monitored background jobs on remote Linux servers via SSH. Configured structured logging, audit trails, and memory-optimized container flags for headless Chromium to prevent memory leaks during long-running tasks.",
      },
      {
        headline: "Collaborative Agile & Review-Driven Workflow",
        detail:
          "Delivered software through Git-based workflows, strict peer code reviews, and continuous integration (CI) pipelines, ensuring high code quality, maintainability, and seamless team collaboration.",
      },
    ],
    stack: [
      "Python",
      "Playwright",
      "asyncio",
      "Flask",
      "FastAPI",
      "React",
      "SQL",
      "Azure Functions",
      "Linux / SSH",
      "Git",
    ],
  },
];
