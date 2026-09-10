/**
 * Filename case guard.
 *
 * Windows and macOS resolve imports case-insensitively; Vercel builds on
 * case-sensitive Linux. So `import "@/pages/Home"` against a file git records
 * as `pages/home.tsx` builds locally and fails in CI with a bare "module not
 * found". Git makes this easy to get wrong on Windows: with `core.ignorecase`
 * true a rename that only changes case is invisible to `git add`, so the index
 * keeps the old spelling while the working tree shows the new one.
 *
 * This checks both directions against `git ls-files`, which is exactly what a
 * Linux checkout will see.
 *
 * Run with: npm run check:case
 */
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, posix } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const git = (...args) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8" });

const tracked = new Set(git("ls-files").trim().split("\n").filter(Boolean));
const failures = [];

/* 1. Index spelling must match the working tree spelling. */
for (const file of tracked) {
  const dir = posix.dirname(file);
  const base = posix.basename(file);
  let entries;
  try {
    entries = readdirSync(join(root, dir));
  } catch {
    continue;
  }
  const actual = entries.find((e) => e.toLowerCase() === base.toLowerCase());
  if (actual && actual !== base) {
    failures.push(
      `case drift: git records "${dir}/${base}" but the working tree has "${dir}/${actual}"\n` +
        `            fix: git rm --cached "${dir}/${base}" && git add "${dir}/${actual}"`,
    );
  }
}

/* 2. Every import must resolve against a tracked path with exact case. */
const CANDIDATE_SUFFIXES = ["", ".ts", ".tsx", ".svg", ".css", "/index.ts", "/index.tsx"];
const sources = [...tracked].filter((f) => /^client\/src\/.+\.(ts|tsx)$/.test(f));

for (const file of sources) {
  const body = readFileSync(join(root, file), "utf8");
  const specifiers = [...body.matchAll(/(?:from|import)\s+"([^"]+)"/g)].map((m) => m[1]);

  for (const spec of specifiers) {
    let target;
    if (spec.startsWith("@/")) target = `client/src/${spec.slice(2)}`;
    else if (spec.startsWith(".")) target = posix.normalize(posix.join(posix.dirname(file), spec));
    else continue; // bare package specifier, resolved by node

    if (CANDIDATE_SUFFIXES.some((s) => tracked.has(target + s))) continue;

    const nearMiss = [...tracked].find(
      (t) => t.toLowerCase().startsWith(target.toLowerCase()),
    );
    failures.push(
      `unresolved: ${file}\n            imports "${spec}"` +
        (nearMiss ? `\n            git tracks "${nearMiss}" - case does not match` : ""),
    );
  }
}

if (failures.length > 0) {
  console.error("Filename case check failed. A Linux build would not resolve these:\n");
  for (const f of failures) console.error(`  ${f}\n`);
  process.exit(1);
}

console.log(
  `Filename case check passed: ${sources.length} source files, all imports resolve with exact case.`,
);
