import type { ExperienceRole } from "@/types";

/**
 * Production career history, newest first.
 *
 * Each highlight pairs a short headline with the engineering detail behind it,
 * so the timeline reads as capability rather than as a task list.
 */
export const experience: readonly ExperienceRole[] = [
  {
    company: "BDSR Solutions LLP",
    title: "Software Developer",
    period: "Mar 2026 — Present",
    location: "India",
    current: true,
    summary:
      "Started on Python data-acquisition pipelines and moved onto Quantis, an enterprise performance management platform, owning backend services and frontend modules across several business features.",
    highlights: [
      {
        headline: "Built resilient acquisition pipelines against hostile targets",
        detail:
          "Handled URL discovery, session management, pagination, HTML parsing and data transformation for dynamic web applications, where the failure modes are rate limits, shifting markup and partial responses rather than clean errors.",
      },
      {
        headline: "Cut execution cost by redesigning connection handling",
        detail:
          "Reworked Python connection pooling and request-processing logic so multiple companies could be processed through a single API session, materially reducing runtime and resource consumption per acquisition run.",
      },
      {
        headline: "Moved from scripts to a live product surface",
        detail:
          "Progressed into full-stack work on Quantis, a Flask and React performance management platform, contributing backend services, frontend modules, REST integrations and dashboard features used by real operators.",
      },
      {
        headline: "Owned backend logic behind operational dashboards",
        detail:
          "Designed and optimised the services supporting performance dashboards, agent scorecards, training modules, reporting workflows and real-time metric visualisation, including diagnosis of production faults across the stack.",
      },
      {
        headline: "Ran deployments on remote Linux infrastructure",
        detail:
          "Deployed and monitored scraping services on remote Linux servers over SSH, troubleshooting runtime failures and keeping scheduled production workloads healthy.",
      },
      {
        headline: "Worked inside a review-driven team process",
        detail:
          "Collaborated through Git-based version control, code review, feature delivery, testing and production releases, which is where most of the discipline in the work above actually came from.",
      },
    ],
    stack: [
      "Python",
      "Flask",
      "React",
      "REST APIs",
      "SQL",
      "Linux / SSH",
      "Git",
    ],
  },
];
