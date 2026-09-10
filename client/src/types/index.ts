/**
 * Domain models for the portfolio.
 *
 * Every record rendered by a section is described here first. Sections read
 * typed data from `@/data` and never invent shapes inline, so a content edit
 * that breaks a contract fails at `tsc` rather than in the browser.
 */

/** Sections that participate in nav, scroll-spy and the skip link. */
export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "certifications"
  | "contact";

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Projects                                  */
/* -------------------------------------------------------------------------- */

/** Filter buckets on the projects grid. `all` is synthesised by the UI. */
export type ProjectCategory =
  | "Applied AI & GraphRAG"
  | "Full-Stack Platforms"
  | "Data & Analytics";

/** Drives the accent colour of a tech pill. */
export type TechDomain =
  | "language"
  | "frontend"
  | "backend"
  | "data"
  | "infra";

export interface TechTag {
  readonly label: string;
  readonly domain: TechDomain;
}

/** An outbound link on a project card. `kind` selects the icon and label. */
export type ProjectLinkKind = "github" | "demo" | "notebook";

export interface ProjectLink {
  readonly kind: ProjectLinkKind;
  readonly label: string;
  readonly href: string;
}

/** One node in the rendered architecture flow diagram. */
export interface PipelineStage {
  readonly step: number;
  readonly name: string;
  readonly detail: string;
}

/** A named engineering guarantee the system upholds. */
export interface Invariant {
  readonly name: string;
  readonly statement: string;
}

/** A single measured fact shown in the inspector's metrics strip. */
export interface ProjectMetric {
  readonly label: string;
  readonly value: string;
}

export interface Project {
  readonly slug: string;
  readonly title: string;
  /** Short trailing clause rendered after the title on the card. */
  readonly subtitle: string;
  readonly category: ProjectCategory;
  readonly timeline: string;
  readonly scope: string;
  /** True for the two flagship systems; controls ordering and card emphasis. */
  readonly flagship: boolean;
  /** Imported SVG cover module resolved by Vite at build time. */
  readonly cover: string;
  readonly coverAlt: string;
  /** One or two sentences. Rendered on the card. */
  readonly summary: string;
  /** Full narrative. Rendered in the inspector's Overview tab. */
  readonly overview: readonly string[];
  readonly pipeline: readonly PipelineStage[];
  readonly innovations: readonly string[];
  readonly invariants: readonly Invariant[];
  readonly metrics: readonly ProjectMetric[];
  readonly stack: readonly TechTag[];
  readonly links: readonly ProjectLink[];
}

/* -------------------------------------------------------------------------- */
/*                                 Experience                                 */
/* -------------------------------------------------------------------------- */

export interface ExperienceHighlight {
  readonly headline: string;
  readonly detail: string;
}

export interface ExperienceRole {
  readonly company: string;
  readonly title: string;
  readonly period: string;
  readonly location: string;
  readonly current: boolean;
  readonly summary: string;
  readonly highlights: readonly ExperienceHighlight[];
  readonly stack: readonly string[];
}

/* -------------------------------------------------------------------------- */
/*                                   Skills                                   */
/* -------------------------------------------------------------------------- */

/**
 * Production capability, not a percentage. `working` means shipped under
 * supervision or in side projects; `proficient` means shipped independently;
 * `advanced` means owned end-to-end in production including failure modes.
 */
export type Proficiency = "advanced" | "proficient" | "working";

export interface Skill {
  readonly name: string;
  readonly proficiency: Proficiency;
  /** Optional clarifier, e.g. the dialect or runtime actually used. */
  readonly note?: string;
}

/** Lucide icon names, resolved through an explicit registry in the section. */
export type SkillIconName =
  | "code"
  | "layout"
  | "server"
  | "brain"
  | "shield";

export interface SkillCategory {
  readonly id: string;
  readonly title: string;
  readonly icon: SkillIconName;
  readonly description: string;
  readonly skills: readonly Skill[];
}

/* -------------------------------------------------------------------------- */
/*                        Certifications & Education                          */
/* -------------------------------------------------------------------------- */

export interface Certification {
  readonly title: string;
  readonly issuer: string;
  readonly grade?: string;
  readonly verifyUrl?: string;
}

export interface EducationRecord {
  readonly qualification: string;
  readonly institution: string;
  readonly period: string;
  readonly result: string;
  readonly specialization?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Contact                                   */
/* -------------------------------------------------------------------------- */

export type ContactChannelIcon = "mail" | "phone" | "linkedin" | "github";

export interface ContactChannel {
  readonly icon: ContactChannelIcon;
  readonly label: string;
  readonly value: string;
  readonly href: string;
  /** Opens in a new tab with `rel="noopener noreferrer"`. */
  readonly external: boolean;
}
