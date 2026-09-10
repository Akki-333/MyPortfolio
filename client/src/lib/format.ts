import type { Proficiency, TechDomain } from "@/types";

/**
 * Presentation lookups.
 *
 * These are `Record<Union, string>` rather than functions with a default
 * branch, so adding a member to `TechDomain` or `Proficiency` fails the build
 * here instead of silently rendering an unstyled pill.
 */

/** Pill styling per technology domain. All pairs clear WCAG AA on white. */
export const techDomainClass: Record<TechDomain, string> = {
  language: "bg-slate-100 text-slate-700 ring-slate-200",
  frontend: "bg-sky-50 text-sky-800 ring-sky-200",
  backend: "bg-cyan-50 text-cyan-800 ring-cyan-200",
  data: "bg-indigo-50 text-indigo-800 ring-indigo-200",
  infra: "bg-teal-50 text-teal-800 ring-teal-200",
};

export const proficiencyLabel: Record<Proficiency, string> = {
  advanced: "Advanced",
  proficient: "Proficient",
  working: "Working",
};

/** Filled segments out of three, used by the proficiency meter. */
export const proficiencyLevel: Record<Proficiency, number> = {
  advanced: 3,
  proficient: 2,
  working: 1,
};

export const proficiencyClass: Record<Proficiency, string> = {
  advanced: "bg-sky-700",
  proficient: "bg-sky-500",
  working: "bg-sky-300",
};
