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
      "Started on remote Python data-acquisition pipelines and moved into full-stack platform engineering across three products, owning backend services, dashboards, automated testing, security review and the crawler infrastructure that feeds them.",
    highlights: [
      {
        headline: "Built acquisition engines that survive hostile targets",
        detail:
          "High-throughput headless crawlers in Python, Playwright and asyncio, pulling structured data out of single-page applications that actively resist it. Handled cross-domain iframes, multi-location dialogs behind a \"See all\" trigger, dynamic cookie banners and chat overlays, using DOM mutation observers and network route blocking to keep pages stable long enough to read.",
      },
      {
        headline: "Made long crawls survive their own failures",
        detail:
          "Offset-window, modal-driven and infinite-scroll pagination behind one interface, with bounded concurrency through semaphores, batch flushing, real-time deduplication and checkpointed resume. A run that dies at hour three restarts where it stopped instead of from zero, and pages are normalised to markdown for downstream consumption.",
      },
      {
        headline: "Delivered full-stack features on two live platforms",
        detail:
          "On the performance management platform: Flask services on Azure Functions, ETL aggregation, agent scorecards, pay-for-performance calculation and the React dashboards that surface them to live business operators. On the knowledge platform: FastAPI services backed by a FAISS vector index and LangChain, plus process-modelling and document workflows.",
      },
      {
        headline: "Owned debugging, test automation and security review",
        detail:
          "Diagnosed cross-stack production faults and the data edge cases that caused them. Wrote integration and API regression suites, and ran application security evaluations covering endpoint authorisation, payload sanitisation and validation boundaries.",
      },
      {
        headline: "Ran production workloads on remote Linux servers",
        detail:
          "Deployed, scheduled and monitored jobs over SSH with structured CSV and file audit logs, memory-safe browser flags for containerised Chromium, and fallback handlers so a crashed run loses no collected data.",
      },
      {
        headline: "Worked inside a review-driven delivery process",
        detail:
          "Git-based version control, peer code review and continuous integration. Most of the discipline above came from that loop rather than from working alone.",
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
