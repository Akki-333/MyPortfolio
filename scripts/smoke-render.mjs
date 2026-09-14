/**
 * Render smoke test.
 *
 * `tsc` proves the types line up and `vite build` proves the bundle links,
 * but neither executes a component. This renders the whole page through
 * Vite's SSR loader and asserts that the content each section is responsible
 * for actually reaches the output, so a broken import, a bad data shape or a
 * render-time throw fails here instead of in the browser.
 *
 * Run with: npm run verify
 */
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import React from "react";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Each check names the section it guards and a string only that section emits. */
const CHECKS = [
  ["hero: name", /Akshay S/],
  ["hero: hook statement", /full-stack web applications, resilient data acquisition/],
  ["hero: terminal badge", /open_for_opportunities/],
  ["a11y: skip link", /Skip to content/],
  ["a11y: main landmark", /id="main"/],
  ["about: heading", /Building software that holds up/],
  ["skills: proficiency legend", /Proficient/],
  ["skills: no percentage bars", /^(?!.*aria-valuenow).*$/s],
  ["projects: archivemind", /ArchiveMind-AI/],
  ["projects: papermint", /PaperMint/],
  ["projects: stay and dine", /Stay (&amp;|&) Dine/],
  ["projects: logapart", /LogApart/],
  ["projects: equity forecasting", /Quantitative Equity Forecasting/],
  ["projects: captioning", /Multimodal Captioning Pipeline/],
  ["projects: filter group", /Filter projects by category/],
  ["projects: inspector cta", /Inspect architecture/],
  ["experience: employer", /BDSR Solutions LLP/],
  ["experience: crawler work", /Playwright/],
  ["about: soft-skill cards", /Steady when things break/],
  ["certifications: issuer", /(E&amp;ICT|E&ICT) Academy, IIT Kanpur/],
  ["education: institution", /Bannari Amman Institute of Technology/],
  ["contact: email", /akkies445@gmail\.com/],
  ["security: external links carry rel guard", /rel="noopener noreferrer"/],
];

const server = await createServer({
  configFile: resolve(projectRoot, "vite.config.ts"),
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

let failures = 0;

try {
  const { Home } = await server.ssrLoadModule("/src/pages/Home.tsx");
  const html = renderToString(React.createElement(Home));

  for (const [name, pattern] of CHECKS) {
    const passed = pattern.test(html);
    if (!passed) failures += 1;
    console.log(`${passed ? "  ok" : "FAIL"}  ${name}`);
  }

  console.log(
    `\n${CHECKS.length - failures}/${CHECKS.length} checks passed ` +
      `(${html.length} chars rendered)`,
  );
} catch (error) {
  console.error("\nRender threw before any check could run:\n", error);
  failures = CHECKS.length;
} finally {
  await server.close();
}

process.exit(failures === 0 ? 0 : 1);
