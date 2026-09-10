/**
 * Compact mock CLI badge.
 *
 * Purely decorative, so the whole block is hidden from assistive technology:
 * the same facts (role, availability, focus areas) are already announced in
 * the hero heading and status line above it.
 */
export function TerminalBadge() {
  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden rounded-xl bg-slate-900 shadow-lg ring-1 ring-slate-800"
    >
      <div className="flex items-center gap-1.5 border-b border-slate-800 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-[11px] tracking-wide text-slate-500">
          akshay.status
        </span>
      </div>

      <pre className="overflow-x-auto px-3.5 py-3.5 font-mono text-[11px] leading-relaxed text-slate-300 sm:text-xs">
        <code>
          <span className="text-sky-400">{"> "}</span>
          <span className="text-slate-400">akshay.status()</span>
          {"\n"}
          <span className="text-slate-500">{"{"}</span>
          {"\n  "}
          <span className="text-cyan-300">open_for_opportunities</span>
          <span className="text-slate-500">: </span>
          <span className="text-emerald-300">true</span>
          <span className="text-slate-500">,</span>
          {"\n  "}
          <span className="text-cyan-300">primary_focus</span>
          <span className="text-slate-500">: [</span>
          {"\n    "}
          <span className="text-amber-200">{'"development"'}</span>
          <span className="text-slate-500">,</span>
          {"\n    "}
          <span className="text-amber-200">{'"testing"'}</span>
          <span className="text-slate-500">,</span>
          {"\n    "}
          <span className="text-amber-200">{'"debugging"'}</span>
          {"\n  "}
          <span className="text-slate-500">],</span>
          {"\n  "}
          <span className="text-cyan-300">shipping</span>
          <span className="text-slate-500">: </span>
          <span className="text-amber-200">{'"production"'}</span>
          {"\n"}
          <span className="text-slate-500">{"}"}</span>
          {"\n"}
          <span className="text-sky-400">{"> "}</span>
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 bg-sky-400 align-middle animate-[caret-blink_1.1s_steps(1)_infinite]" />
        </code>
      </pre>
    </div>
  );
}
