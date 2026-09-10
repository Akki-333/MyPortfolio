import type { Certification, EducationRecord } from "@/types";

/**
 * Accreditations. `verifyUrl` is omitted where no public verification page
 * exists; the UI renders the credential without a dead link rather than
 * pointing at an issuer homepage and calling it verification.
 */
export const certifications: readonly Certification[] = [
  {
    title: "AI & Data Science Using Python",
    issuer: "CDAC",
    grade: "Grade A",
  },
  {
    title: "Data Analytics using AI",
    issuer: "E&ICT Academy, IIT Kanpur",
  },
  {
    title: "Complete Data Analyst Bootcamp",
    issuer: "Udemy",
  },
];

/** Academic record, newest first. */
export const education: readonly EducationRecord[] = [
  {
    qualification: "B.E. Computer Science and Engineering",
    institution: "Bannari Amman Institute of Technology",
    period: "2021 — 2025",
    result: "CGPA 7.1",
    specialization: "Computer Science and Engineering",
  },
  {
    qualification: "Higher Secondary Education",
    institution: "Senthil Public School",
    period: "2020 — 2021",
    result: "79%",
  },
  {
    qualification: "Secondary Education",
    institution: "Kailash Maansarovar School",
    period: "2018 — 2019",
    result: "82.5%",
  },
];
