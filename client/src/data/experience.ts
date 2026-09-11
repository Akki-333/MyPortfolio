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
      "Began by building remote Python web scraping pipelines and evolved into full-stack and platform engineering across three core initiatives: TACS (ongoing platform), Quantis (Flask & React performance platform), and Presto (query & data integration). Own end-to-end REST APIs, interactive analytics dashboards, automated test suites, application security audits, and high-throughput web extraction infrastructure.",
    highlights: [
      {
        headline: "Full-Stack Enterprise Architecture & Digital Asset Pipeline (TACS)",
        detail:
          "Architected and deployed scalable client-onboarding and financial workflow systems for the TACS Enterprise Settlement Platform using React, FastAPI, PostgreSQL, and SQLAlchemy. Engineered a secure, high-throughput binary asset ingestion pipeline with chunked streaming, path-traversal sanitization, and atomic transaction rollbacks to ensure disk-database synchronization and zero data loss. Implemented multi-tier data validation engines and compliance verification workflows (OFAC SDN sanctions auditing), while optimizing client-side state management for real-time validation, dynamic multi-stage forms, and asynchronous upload telemetry.",
      },
      {
        headline: "Stateful Pagination, Deduplication & Checkpointed Ingestion (Web Scraping)",
        detail:
          "Built multi-modal pagination handlers for URL offset marching (with Amazon 10k window caps), infinite scroll settling, and DOM-mutation next buttons. Implemented stateful run resumption to automatically continue interrupted runs from the exact last page scraped, paired with FastAPI-backed URL deduplication and 25-record chunked bulk database upserts.",
      },
      {
        headline: "Full-Stack Product Engineering across Quantis & Presto",
        detail:
          "Developed core full-stack features for Quantis, an enterprise performance management platform built with Flask and React, delivering modular UI components, executive dashboards, and backend RESTful APIs for real-time KPI tracking and operator scorecards.Developed end-to-end features for Presto, including backend query handling, schema validation engines, inter-service API integrations, and responsive workflow canvas interfaces for enterprise process transformation."
      },
      {
        headline: "Automated API Testing, Security Hardening & Debugging",
        detail:
          "Investigated and resolved cross-stack production issues and data edge cases. Created comprehensive automated API regression and integration test suites to safeguard core business scoring logic, and conducted security evaluations focusing on token authorization, endpoint protection, payload sanitization, and data isolation.",
      },
      {
        headline: "Remote Linux Operations & Server-Side Execution",
        detail:
          "Deployed, scheduled, and monitored production Python workloads on remote Linux servers using PuTTY, WinSCP, and SSH. Configured structured CSV/text audit logging, defensive Excel fallback sheets for problematic records, and memory-safe Chromium container flags (--disable-dev-shm-usage, sandbox isolation) for stable 24/7 background execution.",
      },
      {
        headline: "Collaborative SDLC & Production Reliability",
        detail:
          "Delivered reliable software through Git-based workflows, strict peer code reviews, and continuous integration pipelines. Applied defensive engineering principles to ensure systems maintain structural correctness and graceful recovery even when upstream web inputs and schemas fail.",
      },

    ],
    stack: [
      "Python",
      "Playwright",
      "FastAPI",
      "React",
      "SQL",
      "Linux / SSH",
      "Git",
    ],
  },
];
