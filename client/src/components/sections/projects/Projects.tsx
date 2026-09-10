import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { projectCategories, projects } from "@/data/projects";
import { useProjectFilter } from "@/hooks/useProjectFilter";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { ArchitectureInspector } from "./ArchitectureInspector";
import { FilterBar } from "./FilterBar";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const { active, setActive, buckets, visible } = useProjectFilter(
    projects,
    projectCategories,
  );
  const [inspectedSlug, setInspectedSlug] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const inspected = useMemo(
    () => projects.find((project) => project.slug === inspectedSlug) ?? null,
    [inspectedSlug],
  );

  const closeInspector = useCallback(() => setInspectedSlug(null), []);

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Selected work"
      title="Systems, not screenshots"
      description="Five builds, ordered by depth. Each one opens into its architecture, the decisions behind it, and the guarantees it holds."
      tinted
    >
      <FilterBar buckets={buckets} active={active} onChange={setActive} />

      {/*
        `layout` on each item animates the grid reflow when the filter changes.
        Disabled under reduced-motion, where items appear in place instead.
      */}
      <motion.ul
        layout={!reducedMotion}
        className="grid gap-6 lg:grid-cols-2"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout={!reducedMotion}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <ProjectCard project={project} onInspect={setInspectedSlug} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Announces the filtered result count to assistive technology. */}
      <p aria-live="polite" className="sr-only">
        {`${visible.length} ${visible.length === 1 ? "project" : "projects"} shown`}
      </p>

      <ArchitectureInspector project={inspected} onClose={closeInspector} />
    </SectionWrapper>
  );
}
