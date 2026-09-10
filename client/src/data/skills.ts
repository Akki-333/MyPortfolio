import type { SkillCategory } from "@/types";

/**
 * Competencies grouped by production capability.
 *
 * Deliberately no percentages. A single number implies a precision nobody can
 * justify; `Proficiency` states what has actually been shipped and owned.
 */
export const skillCategories: readonly SkillCategory[] = [
  {
    id: "languages",
    title: "Core Languages",
    icon: "code",
    description:
      "Languages used daily in production, including the dialect quirks that only show up under load.",
    skills: [
      { name: "Python", proficiency: "advanced", note: "3.11, asyncio" },
      { name: "TypeScript", proficiency: "proficient", note: "strict mode" },
      { name: "JavaScript", proficiency: "proficient", note: "ESNext" },
      { name: "SQL", proficiency: "advanced", note: "PostgreSQL, TiDB, MySQL" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Architecture",
    icon: "layout",
    description:
      "Client-side systems built for render performance and accessible interaction, not just visual output.",
    skills: [
      { name: "React 18", proficiency: "advanced" },
      { name: "Vite", proficiency: "proficient" },
      { name: "Tailwind CSS", proficiency: "advanced" },
      { name: "Radix UI primitives", proficiency: "proficient" },
      { name: "React Flow", proficiency: "working", note: "@xyflow/react" },
      { name: "Wouter", proficiency: "proficient" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Distributed Systems",
    icon: "server",
    description:
      "Service design, transport choices and the authorisation boundaries that keep them honest.",
    skills: [
      { name: "FastAPI", proficiency: "advanced" },
      { name: "Flask", proficiency: "proficient" },
      { name: "Node.js", proficiency: "proficient" },
      { name: "Express", proficiency: "proficient" },
      { name: "REST API design", proficiency: "advanced" },
      { name: "WebSockets", proficiency: "proficient" },
      { name: "JWT & RBAC", proficiency: "proficient" },
    ],
  },
  {
    id: "ai",
    title: "AI, Vector & Graph Engineering",
    icon: "brain",
    description:
      "Retrieval systems that combine embeddings with graph structure, plus the extraction pipelines that feed them.",
    skills: [
      { name: "GraphRAG", proficiency: "proficient" },
      { name: "Neo4j", proficiency: "proficient", note: "Cypher" },
      { name: "Pinecone", proficiency: "proficient" },
      { name: "LangChain", proficiency: "proficient" },
      { name: "Sentence-Transformers", proficiency: "working" },
      { name: "OCR pipelines", proficiency: "proficient", note: "Tesseract, PyMuPDF" },
      { name: "Streamlit", proficiency: "proficient" },
    ],
  },
  {
    id: "devops",
    title: "Testing & DevOps",
    icon: "shield",
    description:
      "The verification layer: automated suites, static architecture enforcement and repeatable deployment.",
    skills: [
      { name: "Pytest", proficiency: "advanced", note: "unit, integration, AST checks" },
      { name: "Vitest / Jest", proficiency: "working" },
      { name: "Docker", proficiency: "proficient" },
      { name: "GitHub Actions", proficiency: "proficient" },
      { name: "Vercel & Render", proficiency: "proficient" },
      { name: "Linux administration", proficiency: "proficient", note: "SSH, systemd" },
    ],
  },
];

/** Legend copy for the proficiency scale, rendered once beneath the grid. */
export const proficiencyLegend = [
  {
    level: "advanced" as const,
    meaning: "Owned end to end in production, including its failure modes.",
  },
  {
    level: "proficient" as const,
    meaning: "Shipped independently on real workloads.",
  },
  {
    level: "working" as const,
    meaning: "Used in delivered work, still deepening.",
  },
];
