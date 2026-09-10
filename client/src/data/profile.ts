import type { ContactChannel, NavItem } from "@/types";

/** Identity and hero copy. Single source for anything naming the owner. */
export const profile = {
  name: "Akshay S",
  headline: "Full-Stack & Systems Engineer",
  /** Cycled by the hero role rotator. Kept short enough to avoid reflow. */
  roles: [
    "Full-Stack & Systems Engineer",
    "Applied AI & GraphRAG Specialist",
    "Data Solutions Architect",
  ],
  hook: "Building high-integrity distributed web platforms, enterprise GraphRAG intelligence systems, and deterministic data extraction pipelines. Focused on clean architecture, AST-enforced boundaries, and production performance.",
  location: "India",
  availability: "Open to opportunities",
  resumePath: "/Akshay_DS_Updated.pdf",
  resumeFileName: "Akshay-S-CV.pdf",
  email: "akkies445@gmail.com",
  phone: "+91 8248316571",
  github: "https://github.com/Akki-333",
  linkedin: "https://www.linkedin.com/in/ak445",
} as const;

/** Sections in document order. Drives the navbar, drawer and scroll-spy. */
export const navItems: readonly NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export const contactChannels: readonly ContactChannel[] = [
  {
    icon: "mail",
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    icon: "phone",
    label: "Phone",
    value: profile.phone,
    href: "tel:+918248316571",
    external: false,
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/ak445",
    href: profile.linkedin,
    external: true,
  },
  {
    icon: "github",
    label: "GitHub",
    value: "github.com/Akki-333",
    href: profile.github,
    external: true,
  },
];

/**
 * Facts rendered in the About stat strip. Values are short by design so the
 * grid never wraps into a second line at 375px.
 */
export const aboutStats = [
  { label: "Production role", value: "BDSR Solutions LLP" },
  { label: "Flagship systems", value: "2 shipped" },
  { label: "Degree", value: "B.E. CSE" },
  { label: "Languages", value: "English, Tamil" },
] as const;
