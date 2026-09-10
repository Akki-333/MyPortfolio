import type { ContactChannel, NavItem } from "@/types";

/** Identity and hero copy. Single source for anything naming the owner. */
export const profile = {
  name: "Akshay S",
  headline: "Software Developer",
  /** Cycled by the hero role rotator. Two entries, both plainly accurate. */
  roles: ["Software Developer", "Full-Stack Developer"],
  hook: "I build full-stack web applications, resilient data acquisition pipelines, and applied retrieval systems. Most of my work sits where clean architecture meets messy production reality, and has to stay correct when inputs, networks and third-party interfaces stop cooperating.",
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
 * Facts rendered in the About stat strip. Tiles are equal height and values
 * are free to wrap, so keep these to three words or so; anything longer
 * pushes the row taller than the paragraph it sits under.
 */
export const aboutStats = [
  { label: "Role", value: "Software Developer" },
  { label: "Company", value: "BDSR Solutions LLP" },
  { label: "Education", value: "B.E. CSE" },
  { label: "Languages", value: "English, Tamil" },
] as const;
