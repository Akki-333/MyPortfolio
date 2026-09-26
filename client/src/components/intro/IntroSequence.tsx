import { useEffect, useRef, useState, type CSSProperties } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

/**
 * Startup intro: a five second title sequence played over the page on the
 * first visit of a session.
 *
 * Whether it plays is decided before first paint by `public/intro-gate.js`,
 * which marks <html data-intro>. This component only reads that flag, so the
 * decision and the stage colour painted on the first frame can never
 * disagree. While the flag is set the page is scroll-locked and its entrance
 * animations are held (styles/intro.css); it is cleared mid-exit, so the
 * hero rises in as the stage splits open.
 *
 * Motion is CSS, keyed to the delays in intro.css. Only what depends on a
 * running number - the load counter, the progress line and the role decode -
 * is driven here, from one requestAnimationFrame clock that writes straight
 * to the DOM rather than re-rendering sixty times a second.
 *
 * Any key, click, tap or wheel skips to the exit. The overlay is
 * aria-hidden: it repeats nothing the page does not already say, and a
 * screen reader user's first keystroke dismisses it.
 */

type Phase = "waiting" | "playing" | "exiting" | "done";

/** Milliseconds. Keep in step with the timeline in styles/intro.css. */
const TIMELINE = {
  loadStart: 250,
  loadEnd: 3650,
  roleIn: 1350,
  /** Gap between successive role decodes. */
  roleStep: 1250,
  roleDecode: 800,
  exit: 3950,
  /** From exit: the split begins and the page is released beneath it. */
  release: 250,
  /** From exit: the stage has fully split. */
  finish: 1050,
} as const;

const SKIP_EVENTS = ["keydown", "pointerdown", "wheel", "touchstart"] as const;

/**
 * Load curve as [time, progress] stops: a quick start, a stall, a long run,
 * a short hang before completion. Reads as real work rather than a tween.
 */
const LOAD_CURVE = [
  [0.24, 0.31],
  [0.36, 0.37],
  [0.66, 0.8],
  [0.76, 0.84],
  [1, 1],
] as const;

const LOG = [
  { at: 0.01, verb: "init", detail: "portfolio" },
  { at: 0.3, verb: "load", detail: `${projects.length} case studies` },
  { at: 0.72, verb: "status", detail: "open_for_opportunities" },
  { at: 1, verb: "ready", detail: "" },
] as const;

const NAME_CHARS = Array.from(profile.name);
const YEAR = new Date().getFullYear();

/** Roles centre-padded to one width, so the line never shifts as they swap. */
const ROLE_WIDTH = Math.max(...profile.roles.map((role) => role.length));
const ROLES = profile.roles.map((role) => {
  const left = Math.floor((ROLE_WIDTH - role.length) / 2);
  return role.padStart(role.length + left).padEnd(ROLE_WIDTH);
});
const ROLE_BLANK = " ".repeat(ROLE_WIDTH);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_+=#*";
/** How long a scrambled glyph holds before it flips; per-frame reads as noise. */
const GLYPH_HOLD_MS = 45;

/** The favicon mark; paths match public/favicon.svg. */
const TILE = "M8 0h16a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8Z";
const TILE_OUTLINE =
  "M8 .5h16A7.5 7.5 0 0 1 31.5 8v16a7.5 7.5 0 0 1-7.5 7.5H8A7.5 7.5 0 0 1 .5 24V8A7.5 7.5 0 0 1 8 .5Z";
const GLYPH =
  "M9.4 23.5 15.1 8.5h2.1l5.7 15h-3.1l-1.25-3.5h-5.06l-1.24 3.5Zm5-6h3.36L16.1 12.6Z";

function initialPhase(): Phase {
  if (typeof document === "undefined") return "done";
  if (!document.documentElement.hasAttribute("data-intro")) return "done";
  return document.hidden ? "waiting" : "playing";
}

export function IntroSequence() {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [logCount, setLogCount] = useState(0);
  const lineRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  // A tab opened in the background waits to be looked at before it plays.
  useEffect(() => {
    if (phase !== "waiting") return;

    const onVisibility = () => {
      if (!document.hidden) setPhase("playing");
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [phase]);

  // The clock: counter, progress line and role decode. It keeps running
  // through the exit, so a skip never freezes the role mid-scramble.
  const clockRunning = phase === "playing" || phase === "exiting";

  useEffect(() => {
    if (!clockRunning) return;

    const start = performance.now();
    let frame = 0;
    let shownLogs = 0;
    let lastCount = "";
    let lastRole = "";

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = loadProgress(elapsed);

      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${progress})`;
      }

      const count = String(Math.round(progress * 100)).padStart(3, "0");
      if (count !== lastCount && countRef.current) {
        countRef.current.textContent = count;
        lastCount = count;
      }

      const role = roleAt(elapsed, now);
      if (role !== lastRole && roleRef.current) {
        roleRef.current.textContent = role;
        lastRole = role;
      }

      const logs = LOG.filter((entry) => progress >= entry.at).length;
      if (logs !== shownLogs) {
        shownLogs = logs;
        setLogCount(logs);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [clockRunning]);

  // Exit on schedule, or as soon as the visitor does anything.
  useEffect(() => {
    if (phase !== "playing") return;

    const exit = () => setPhase("exiting");
    const timer = window.setTimeout(exit, TIMELINE.exit);
    for (const type of SKIP_EVENTS) {
      window.addEventListener(type, exit, { passive: true });
    }

    return () => {
      window.clearTimeout(timer);
      for (const type of SKIP_EVENTS) {
        window.removeEventListener(type, exit);
      }
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;

    const root = document.documentElement;
    const release = window.setTimeout(
      () => root.removeAttribute("data-intro"),
      TIMELINE.release,
    );
    const finish = window.setTimeout(() => {
      root.removeAttribute("data-intro");
      setPhase("done");
    }, TIMELINE.finish);

    return () => {
      window.clearTimeout(release);
      window.clearTimeout(finish);
    };
  }, [phase]);

  if (phase === "done") return null;

  if (phase === "waiting") {
    return <div className="intro intro-hold" aria-hidden="true" />;
  }

  const ready = logCount === LOG.length;

  return (
    <div
      className={cn("intro", phase === "exiting" && "is-exiting")}
      aria-hidden="true"
    >
      {/* Each half holds the content above or below the seam, and splits with it. */}
      <div className="intro-panel intro-panel-top">
        <span className="intro-edge" />

        <p className="intro-meta intro-meta-start">Portfolio / {YEAR}</p>
        <p className="intro-meta intro-meta-end">
          <span className="intro-hint-fine">Press any key to skip</span>
          <span className="intro-hint-touch">Tap to skip</span>
        </p>

        <div className="intro-upper">
          <Monogram />
          <p className="intro-name">
            {NAME_CHARS.map((char, index) => (
              <span
                key={index}
                className="intro-char"
                style={{ "--i": index } as CSSProperties}
              >
                <span className="intro-char-glyph">{char}</span>
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="intro-panel intro-panel-bottom">
        <span className="intro-edge" />

        {/* Text written by the clock. Its React child never changes. */}
        <div className="intro-lower">
          <span ref={roleRef} className="intro-role">
            {ROLE_BLANK}
          </span>
        </div>

        <ol className="intro-log">
          {LOG.slice(0, logCount).map((entry) => (
            <li
              key={entry.verb}
              className={cn("intro-log-line", entry.at === 1 && "is-ready")}
            >
              <span className="intro-log-verb">{entry.verb}</span>
              {entry.detail}
            </li>
          ))}
        </ol>

        <p className="intro-counter">
          <span className="intro-counter-label">
            {ready ? "Ready" : "Loading"}
          </span>
          <span ref={countRef} className="intro-counter-value">
            000
          </span>
        </p>
      </div>

      <div className="intro-horizon">
        <span ref={lineRef} className="intro-horizon-fill" />
        <span className="intro-horizon-flash" />
      </div>
    </div>
  );
}

function Monogram() {
  return (
    <span className="intro-mark">
      <span className="intro-mark-ring" />
      <svg viewBox="0 0 32 32" className="intro-mark-svg">
        <defs>
          <linearGradient id="intro-mark-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>
        <path className="intro-mark-tile" d={TILE} fill="url(#intro-mark-fill)" />
        <path className="intro-mark-outline" d={TILE_OUTLINE} pathLength={1} />
        <path className="intro-mark-trace" d={GLYPH} pathLength={1} />
        <path className="intro-mark-glyph" d={GLYPH} />
      </svg>
    </span>
  );
}

/** Load progress, 0 to 1, eased segment by segment along LOAD_CURVE. */
function loadProgress(elapsed: number): number {
  const span = TIMELINE.loadEnd - TIMELINE.loadStart;
  const x = Math.min(Math.max((elapsed - TIMELINE.loadStart) / span, 0), 1);

  let x0 = 0;
  let y0 = 0;
  for (const [x1, y1] of LOAD_CURVE) {
    if (x <= x1) {
      const s = (x - x0) / (x1 - x0);
      const eased = s < 0.5 ? 2 * s * s : 1 - (-2 * s + 2) ** 2 / 2;
      return y0 + (y1 - y0) * eased;
    }
    x0 = x1;
    y0 = y1;
  }
  return 1;
}

/** The role line at a moment: blank, mid-decode, or settled on a role. */
function roleAt(elapsed: number, now: number): string {
  const since = elapsed - TIMELINE.roleIn;
  if (since < 0) return ROLE_BLANK;

  const index = Math.min(Math.floor(since / TIMELINE.roleStep), ROLES.length - 1);
  const from = ROLES[index - 1] ?? ROLE_BLANK;
  const to = ROLES[index] ?? ROLE_BLANK;
  const progress = (since - index * TIMELINE.roleStep) / TIMELINE.roleDecode;

  return decode(from, to, progress, Math.floor(now / GLYPH_HOLD_MS));
}

/**
 * Morphs `from` into `to`. A wave of scrambled glyphs sweeps left to right
 * and the settled characters trail behind it. Positions that are equal in
 * both strings never scramble.
 */
function decode(from: string, to: string, progress: number, tick: number): string {
  if (progress >= 1) return to;

  let out = "";
  for (let i = 0; i < to.length; i += 1) {
    const before = from.charAt(i);
    const after = to.charAt(i);
    const position = i / to.length;

    if (before === after || progress < position * 0.45) {
      out += before;
    } else if (progress >= 0.4 + position * 0.6) {
      out += after;
    } else {
      out += GLYPHS.charAt(hash(tick * 97 + i) % GLYPHS.length);
    }
  }
  return out;
}

/** Integer hash, so each glyph slot flips independently but repeatably. */
function hash(n: number): number {
  let h = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  return (h ^ (h >>> 16)) >>> 0;
}
