import { Brain, Code2, LayoutGrid, Server, ShieldCheck } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { proficiencyLegend, skillCategories } from "@/data/skills";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/cn";
import {
  proficiencyClass,
  proficiencyLabel,
  proficiencyLevel,
} from "@/lib/format";
import type { SkillCategory, SkillIconName } from "@/types";

/**
 * Icon registry.
 *
 * Typed as `Record<SkillIconName, ...>`, so adding an icon name to the union
 * without adding it here is a compile error rather than a blank square.
 */
const iconRegistry: Record<SkillIconName, typeof Code2> = {
  code: Code2,
  layout: LayoutGrid,
  server: Server,
  brain: Brain,
  shield: ShieldCheck,
};

export function Skills() {
  return (
    <SectionWrapper
      id="skills"
      eyebrow="Capabilities"
      title="What I can take to production"
      description="Grouped by what the work actually requires rather than scored on a percentage. A number implies a precision nobody can defend, so each entry states how far it has been taken instead."
    >
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            delayMs={index * 70}
          />
        ))}
      </ul>

      <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-sky-100 pt-6">
        {proficiencyLegend.map((entry) => (
          <div key={entry.level} className="flex items-center gap-2.5">
            <Meter level={proficiencyLevel[entry.level]} tone={entry.level} />
            <dt className="text-xs font-bold text-slate-900">
              {proficiencyLabel[entry.level]}
            </dt>
            <dd className="text-xs text-slate-600">{entry.meaning}</dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  );
}

function CategoryCard({
  category,
  delayMs,
}: {
  category: SkillCategory;
  delayMs: number;
}) {
  const ref = useReveal<HTMLLIElement>(delayMs);
  const Icon = iconRegistry[category.icon];

  return (
    <li
      ref={ref}
      className="reveal glass-card glass-card-interactive flex flex-col p-5"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="text-base font-bold text-slate-900">
          {category.title}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {category.description}
      </p>

      <ul className="mt-5 space-y-2.5">
        {category.skills.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {skill.name}
              </p>
              {skill.note ? (
                <p className="truncate text-xs text-slate-600">{skill.note}</p>
              ) : null}
            </div>

            <div className="flex flex-none items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-600">
                {proficiencyLabel[skill.proficiency]}
              </span>
              <Meter
                level={proficiencyLevel[skill.proficiency]}
                tone={skill.proficiency}
              />
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}

/**
 * Three-segment proficiency meter.
 *
 * `aria-hidden` because the adjacent text label already names the level; a
 * screen reader announcing both would read every skill twice.
 */
function Meter({
  level,
  tone,
}: {
  level: number;
  tone: keyof typeof proficiencyClass;
}) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {[1, 2, 3].map((segment) => (
        <span
          key={segment}
          className={cn(
            "h-1.5 w-3.5 rounded-full",
            segment <= level ? proficiencyClass[tone] : "bg-sky-100",
          )}
        />
      ))}
    </span>
  );
}
