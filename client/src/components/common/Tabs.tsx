import { useCallback, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabDefinition {
  readonly id: string;
  readonly label: string;
  readonly panel: ReactNode;
}

interface TabsProps {
  tabs: readonly TabDefinition[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Tab list following the ARIA authoring pattern.
 *
 * Arrow keys move selection, Home and End jump to the ends, and only the
 * active tab is in the tab order. That last part matters: without it a
 * keyboard user has to step through every tab to reach the panel content.
 */
export function Tabs({ tabs, activeId, onChange, className }: TabsProps) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const focusTab = useCallback((index: number) => {
    const buttons =
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[index]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = tabs.findIndex((tab) => tab.id === activeId);
      if (currentIndex === -1) return;

      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (currentIndex + 1) % tabs.length;
          break;
        case "ArrowLeft":
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const target = tabs[nextIndex];
      if (target) {
        onChange(target.id);
        focusTab(nextIndex);
      }
    },
    [tabs, activeId, onChange, focusTab],
  );

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        aria-label="Case study sections"
        onKeyDown={handleKeyDown}
        className="flex gap-1 overflow-x-auto border-b border-sky-100 px-5 sm:px-7"
      >
        {tabs.map((tab) => {
          const selected = tab.id === activeTab?.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              className={cn(
                "focus-ring relative whitespace-nowrap px-3 py-3 text-sm font-semibold transition-colors",
                selected
                  ? "text-sky-800"
                  : "text-slate-600 hover:text-slate-900",
              )}
            >
              {tab.label}
              {selected ? (
                <span
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-sky-600"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {activeTab ? (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeTab.id}`}
          aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          tabIndex={0}
          className="focus-ring px-5 py-6 sm:px-7"
        >
          {activeTab.panel}
        </div>
      ) : null}
    </div>
  );
}
