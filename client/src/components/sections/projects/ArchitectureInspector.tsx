import { useEffect, useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { Pill } from "@/components/common/Pill";
import { Tabs, type TabDefinition } from "@/components/common/Tabs";
import type { Project } from "@/types";

interface ArchitectureInspectorProps {
  project: Project | null;
  onClose: () => void;
}

/**
 * Tabbed case study drawer.
 *
 * The active tab resets whenever the inspected project changes, so opening a
 * second card never lands the reader on a tab they did not choose for it.
 */
export function ArchitectureInspector({
  project,
  onClose,
}: ArchitectureInspectorProps) {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (project) setActiveTab("overview");
  }, [project]);

  if (!project) return null;

  const tabs: readonly TabDefinition[] = [
    {
      id: "overview",
      label: "Overview",
      panel: <OverviewPanel project={project} />,
    },
    {
      id: "pipeline",
      label: "Architecture & Pipeline",
      panel: <PipelinePanel project={project} />,
    },
    {
      id: "innovations",
      label: "Key Innovations",
      panel: <InnovationsPanel project={project} />,
    },
    {
      id: "invariants",
      label: "Engineering Invariants",
      panel: <InvariantsPanel project={project} />,
    },
  ];

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={project.title}
      subtitle={project.subtitle}
    >
      <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />
    </Modal>
  );
}

function OverviewPanel({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {project.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-sky-100 bg-sky-50/60 px-3 py-3"
          >
            <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-600">
              {metric.label}
            </dt>
            <dd className="mt-1 text-sm font-bold text-slate-900">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="space-y-4">
        {project.overview.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-sm leading-relaxed text-slate-700"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div>
        <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Full stack
        </h3>
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech.label}>
              <Pill domain={tech.domain}>{tech.label}</Pill>
            </li>
          ))}
        </ul>
      </div>

      <p className="border-t border-sky-100 pt-4 text-xs text-slate-600">
        {project.scope}
      </p>
    </div>
  );
}

function PipelinePanel({ project }: { project: Project }) {
  return (
    <ol className="relative space-y-0">
      {project.pipeline.map((stage, index) => {
        const isLast = index === project.pipeline.length - 1;
        return (
          <li key={stage.step} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Connector drawn between markers, omitted after the last one. */}
            {!isLast ? (
              <span
                className="absolute left-[15px] top-9 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-sky-300 to-sky-100"
                aria-hidden="true"
              />
            ) : null}

            <span className="relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-sky-700 text-xs font-bold text-white ring-4 ring-white">
              {stage.step}
            </span>

            <div className="min-w-0 flex-1 pt-0.5">
              <h3 className="text-sm font-bold text-slate-900">{stage.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {stage.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function InnovationsPanel({ project }: { project: Project }) {
  return (
    <ul className="space-y-3">
      {project.innovations.map((item) => (
        <li
          key={item.slice(0, 40)}
          className="flex gap-3 rounded-lg border border-sky-100 bg-white p-4"
        >
          <CheckCircle2
            className="h-5 w-5 flex-none text-sky-600"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-slate-700">{item}</p>
        </li>
      ))}
    </ul>
  );
}

function InvariantsPanel({ project }: { project: Project }) {
  return (
    <>
      <p className="mb-4 text-sm text-slate-600">
        Properties the system holds by construction. Each one is enforced in
        code rather than left to reviewer discipline.
      </p>
      <ul className="space-y-3">
        {project.invariants.map((invariant) => (
          <li
            key={invariant.name}
            className="rounded-lg border border-sky-100 bg-sky-50/50 p-4"
          >
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Lock className="h-4 w-4 text-sky-700" aria-hidden="true" />
              {invariant.name}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
              {invariant.statement}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
