import { ExternalLink, Github, Layers, NotebookText, Sparkles } from "lucide-react";
import { Button, ButtonLink } from "@/components/common/Button";
import { Pill } from "@/components/common/Pill";
import { cn } from "@/lib/cn";
import type { Project, ProjectLinkKind } from "@/types";

const linkIcon: Record<ProjectLinkKind, typeof Github> = {
  github: Github,
  demo: ExternalLink,
  notebook: NotebookText,
};

interface ProjectCardProps {
  project: Project;
  onInspect: (slug: string) => void;
}

export function ProjectCard({ project, onInspect }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "glass-card glass-card-interactive flex h-full flex-col overflow-hidden",
        project.flagship && "ring-1 ring-sky-200",
      )}
    >
      {/*
        The 16:9 box is declared in CSS, so the cover occupies its final size
        before the SVG paints and the grid never reflows mid-load.
      */}
      <div className="relative aspect-video overflow-hidden border-b border-sky-100 bg-sky-50">
        <img
          src={project.cover}
          alt={project.coverAlt}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        {project.flagship ? (
          <p className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-sky-800 ring-1 ring-sky-200">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Flagship
          </p>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Pill>{project.category}</Pill>
          <span className="text-xs font-medium text-slate-600">
            {project.timeline}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900">
          {project.title}
        </h3>
        <p className="mt-0.5 text-sm font-medium text-sky-800">
          {project.subtitle}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <li key={tech.label}>
              <Pill domain={tech.domain}>{tech.label}</Pill>
            </li>
          ))}
          {project.stack.length > 5 ? (
            <li>
              <Pill className="bg-white text-slate-600 ring-slate-200">
                {`+${project.stack.length - 5}`}
              </Pill>
            </li>
          ) : null}
        </ul>

        {/* `mt-auto` pins the action row to the bottom so cards in a row align. */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <Button
            onClick={() => onInspect(project.slug)}
            className="flex-1 sm:flex-none"
          >
            <Layers className="h-4 w-4" aria-hidden="true" />
            Inspect architecture
          </Button>

          {project.links.map((link) => {
            const Icon = linkIcon[link.kind];
            return (
              <ButtonLink
                key={link.href}
                href={link.href}
                external
                variant="secondary"
                aria-label={`${link.label}: ${project.title}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </ButtonLink>
            );
          })}
        </div>
      </div>
    </article>
  );
}
