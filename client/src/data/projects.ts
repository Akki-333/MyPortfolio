import type { Project } from "@/types";

import archivemindCover from "@/assets/images/projects/archivemind.svg";
import papermintCover from "@/assets/images/projects/papermint.svg";
import stayAndDineCover from "@/assets/images/projects/stay-and-dine.svg";
import equityCover from "@/assets/images/projects/equity-forecasting.svg";
import captioningCover from "@/assets/images/projects/image-captioning.svg";

/**
 * Case study records, ordered for display: flagship systems first.
 *
 * Only links that resolve to a real, reachable URL are listed. Where a system
 * is distributed rather than hosted (a Streamlit package, a Spaces image), the
 * distribution target is stated in `scope` instead of being faked as a link.
 */
export const projects: readonly Project[] = [
  {
    slug: "archivemind-ai",
    title: "ArchiveMind-AI",
    subtitle: "Enterprise GraphRAG & Document Intelligence",
    category: "Applied AI & GraphRAG",
    timeline: "Production grade",
    scope: "Solo · packaged for Hugging Face Spaces and Vercel",
    flagship: true,
    cover: archivemindCover,
    coverAlt:
      "Document chunks feeding a vector index and a knowledge graph, converging on an answer card that carries a citation",
    summary:
      "A knowledge-graph augmented retrieval platform that unifies Pinecone semantic embeddings with Neo4j graph traversal across a five-stage pipeline, streaming answers with verifiable citations.",
    overview: [
      "Most retrieval systems stop at nearest-neighbour search, which answers well when the question matches a passage and fails badly when the answer is spread across documents. ArchiveMind-AI treats retrieval as a pipeline rather than a lookup, layering graph structure on top of vector similarity so that entity relationships survive the search.",
      "Every answer is streamed to the client over server-sent events with its provenance attached, so a reader can trace a claim back to the source span that produced it. Citations are part of the response contract, not a post-hoc annotation.",
      "The service is designed to fail loudly. Schema validation runs at startup, rate limits are enforced in-process, and the entire test suite runs without touching a network dependency.",
    ],
    pipeline: [
      {
        step: 1,
        name: "Lexical match",
        detail:
          "Keyword pass anchors rare identifiers and exact phrases that embeddings routinely wash out.",
      },
      {
        step: 2,
        name: "Vector k-NN",
        detail:
          "Pinecone similarity search over chunk embeddings returns the semantically closest candidate spans.",
      },
      {
        step: 3,
        name: "Graph neighbour expansion",
        detail:
          "Cypher traversal walks out from matched entities to pull in adjacent context the vector pass never scored.",
      },
      {
        step: 4,
        name: "Entity resolution",
        detail:
          "Aliases and duplicate mentions collapse onto canonical nodes before anything reaches the reranker.",
      },
      {
        step: 5,
        name: "Rerank & synthesise",
        detail:
          "The merged candidate set is reranked, then synthesised into a streamed answer carrying span-level citations.",
      },
    ],
    innovations: [
      "Hybrid retrieval that composes lexical, vector and graph signals instead of choosing one, recovering multi-hop answers a pure vector store cannot reach.",
      "Interactive graph exploration in the browser using @xyflow/react with a custom force-directed layout, so the retrieval context is inspectable rather than opaque.",
      "Server-sent event transport that streams tokens and citation metadata on the same channel, keeping provenance attached to the claim it supports.",
      "Zero-network synthetic test suite: fixtures stand in for Pinecone and Neo4j, so the full suite runs deterministically in CI with no external credentials.",
    ],
    invariants: [
      {
        name: "Fail-fast configuration",
        statement:
          "Schema validation runs before the service accepts traffic; a malformed config aborts startup rather than surfacing as a request-time error.",
      },
      {
        name: "Citation completeness",
        statement:
          "A synthesised claim is emitted only with the source span that supports it; unattributable content is dropped rather than shown.",
      },
      {
        name: "Bounded request cost",
        statement:
          "In-memory rate limiting caps per-client throughput so one caller cannot exhaust the retrieval budget for everyone else.",
      },
    ],
    metrics: [
      { label: "Retrieval stages", value: "5" },
      { label: "Automated tests", value: "135+" },
      { label: "External calls in test suite", value: "0" },
    ],
    stack: [
      { label: "FastAPI", domain: "backend" },
      { label: "Neo4j / Cypher", domain: "data" },
      { label: "Pinecone", domain: "data" },
      { label: "LangChain", domain: "data" },
      { label: "React 18", domain: "frontend" },
      { label: "Tailwind CSS", domain: "frontend" },
      { label: "Server-Sent Events", domain: "backend" },
      { label: "Docker", domain: "infra" },
    ],
    links: [
      {
        kind: "github",
        label: "Source",
        href: "https://github.com/Akki-333/ArchiveMind-AI",
      },
    ],
  },
  {
    slug: "papermint",
    title: "PaperMint",
    subtitle: "Multi-Format Citation Intelligence & Extraction Engine",
    category: "Applied AI & GraphRAG",
    timeline: "Production engine",
    scope: "Solo · distributed as a local Streamlit application",
    flagship: true,
    cover: papermintCover,
    coverAlt:
      "A scanned page with broken hyphenated text passing through a repair stage and emerging as validated citation records",
    summary:
      "A high-throughput bibliographic extraction engine that ingests PDF, Word, PowerPoint and scanned image documents behind a four-layer architecture, with static enforcement of its own layer boundaries.",
    overview: [
      "Bibliographies are hostile input. Text arrives broken across line wraps, hyphenated mid-word, interleaved with running headers, and sometimes only as pixels. PaperMint treats repair as a first-class stage rather than assuming the extractor handed back clean text.",
      "The system is organised into four layers with a strict dependency direction. Domain logic knows nothing about Streamlit, and that rule is checked mechanically rather than by review convention.",
      "Correctness is pinned by a large suite that synthesises its own PDFs in memory, so tests carry no binary fixtures and run identically on any machine.",
    ],
    pipeline: [
      {
        step: 1,
        name: "Ingest & classify",
        detail:
          "Format detection routes PDF, DOCX, PPTX and image input to the right extractor without trusting the file extension.",
      },
      {
        step: 2,
        name: "Text recovery",
        detail:
          "PyMuPDF handles digital text; Tesseract OCR takes over for scanned pages where no text layer exists.",
      },
      {
        step: 3,
        name: "Heuristic repair",
        detail:
          "Soft hyphens are unrolled, ligatures normalised, and running headers stripped before any boundary decision is made.",
      },
      {
        step: 4,
        name: "Boundary detection",
        detail:
          "Multiple splitting strategies compete to segment the reference list, with the highest-confidence segmentation retained.",
      },
      {
        step: 5,
        name: "Dedupe & emit",
        detail:
          "Cross-file duplicate detection collapses repeated references into one validated Pydantic record per citation.",
      },
    ],
    innovations: [
      "Custom Python AST linters enforce the layer boundary statically: a presentation import inside a domain module fails the build, not the code review.",
      "Text repair runs before splitting rather than after, so hyphenation and header noise never corrupt a citation boundary in the first place.",
      "Multi-strategy boundary detection instead of a single regex, letting the engine degrade gracefully across wildly inconsistent reference formats.",
      "Tests synthesise PDFs in memory, giving a fully deterministic suite with no committed binary fixtures.",
    ],
    invariants: [
      {
        name: "Layer purity",
        statement:
          "Domain and application layers import no presentation code. An AST check enforces this on every run.",
      },
      {
        name: "Validated output",
        statement:
          "Every emitted citation is a Pydantic-validated record; partial or unparseable extractions are reported, never silently coerced.",
      },
      {
        name: "Deterministic tests",
        statement:
          "The suite generates its own documents in memory, so results do not depend on fixture files or machine state.",
      },
    ],
    metrics: [
      { label: "Test functions", value: "251" },
      { label: "Parameterised cases", value: "492" },
      { label: "Architecture layers", value: "4" },
    ],
    stack: [
      { label: "Python 3.11", domain: "language" },
      { label: "Streamlit", domain: "frontend" },
      { label: "PyMuPDF", domain: "data" },
      { label: "Tesseract OCR", domain: "data" },
      { label: "Pydantic", domain: "backend" },
      { label: "AST tooling", domain: "infra" },
      { label: "Ruff", domain: "infra" },
    ],
    links: [
      {
        kind: "github",
        label: "Source",
        href: "https://github.com/Akki-333/PaperMint",
      },
    ],
  },
  {
    slug: "stay-and-dine",
    title: "Stay & Dine",
    subtitle: "Enterprise Reserve-and-Dine Platform",
    category: "Full-Stack Platforms",
    timeline: "2 months",
    scope: "Solo · deployed across Vercel and Render",
    flagship: false,
    cover: stayAndDineCover,
    coverAlt:
      "A restaurant floor plan with one table selected, beside a pre-arrival order card showing live nutritional totals",
    summary:
      "A hospitality booking engine with an interactive 2D floor plan, pre-arrival menu ordering with live nutritional totals, and a decoupled two-cloud deployment backed by a distributed database.",
    overview: [
      "Standard booking flows ask for a party size and a time, then assign a table on arrival. Stay & Dine inverts that: the guest picks the actual table from a rendered floor plan and orders ahead, so the restaurant knows both the seat and the kitchen load before anyone walks in.",
      "The client and the API are deployed independently on different providers, which forced explicit thinking about CORS, token lifetime and asset ownership rather than relying on same-origin convenience.",
      "Table state is the contended resource, so it is synchronised over WebSockets. Two guests browsing the same floor plan see the same availability, and a seat cannot be sold twice.",
    ],
    pipeline: [
      {
        step: 1,
        name: "Authenticate",
        detail:
          "JWT issuance with role-based access control separating guest, staff and administrator capabilities.",
      },
      {
        step: 2,
        name: "Select seat",
        detail:
          "The 2D floor plan renders live table state, streamed over a WebSocket channel rather than polled.",
      },
      {
        step: 3,
        name: "Compose order",
        detail:
          "Pre-arrival menu selection recomputes nutritional totals on every change, client-side and instantly.",
      },
      {
        step: 4,
        name: "Commit booking",
        detail:
          "The reservation and its order are written together to TiDB Serverless over a TLS 1.2 connection.",
      },
      {
        step: 5,
        name: "Broadcast",
        detail:
          "The committed seat change is pushed to every connected client so no second guest can claim it.",
      },
    ],
    innovations: [
      "Decoupled two-cloud architecture: a React and Vite single-page app on Vercel talking to a containerised Node and Express service on Render.",
      "TiDB Serverless as the persistence layer, giving horizontal scale characteristics with an encrypted TLS 1.2 connection path.",
      "WebSocket table-state synchronisation that closes the concurrent-booking race window rather than resolving it after the fact.",
      "Nutritional totals computed live during ordering, turning menu selection into an informed decision instead of a checkout surprise.",
    ],
    invariants: [
      {
        name: "Single occupancy",
        statement:
          "A confirmed table for a given service window belongs to exactly one reservation; concurrent claims are rejected, not queued.",
      },
      {
        name: "Authorised access",
        statement:
          "Every mutating endpoint checks a signed token and a role before it touches persistence.",
      },
      {
        name: "Encrypted transport",
        statement:
          "Database traffic is TLS 1.2 end to end; the service refuses an unencrypted connection path.",
      },
    ],
    metrics: [
      { label: "Deployment targets", value: "2 clouds" },
      { label: "Build duration", value: "2 months" },
      { label: "Team size", value: "Solo" },
    ],
    stack: [
      { label: "React", domain: "frontend" },
      { label: "TypeScript", domain: "language" },
      { label: "Node.js", domain: "backend" },
      { label: "Express", domain: "backend" },
      { label: "TiDB Serverless", domain: "data" },
      { label: "WebSockets", domain: "backend" },
      { label: "Tailwind CSS", domain: "frontend" },
      { label: "Vercel / Render", domain: "infra" },
    ],
    links: [
      {
        kind: "demo",
        label: "Live demo",
        href: "https://staydine-reservations.vercel.app",
      },
      {
        kind: "github",
        label: "Source",
        href: "https://github.com/Akki-333/Stay_and_Dine",
      },
    ],
  },
  {
    slug: "equity-forecasting",
    title: "Quantitative Equity Forecasting",
    subtitle: "Time-Series Modelling & Diagnostics",
    category: "Data & Analytics",
    timeline: "2 months",
    scope: "Solo · notebook-distributed research",
    flagship: false,
    cover: equityCover,
    coverAlt:
      "Candlestick price history with a rolling trend line, a forecast cone beyond the last observation, and error metric readouts",
    summary:
      "An end-to-end econometric and deep-learning forecasting workflow that cleans noisy equity feeds, derives rolling technical indicators, and scores multi-step horizons against explicit error benchmarks.",
    overview: [
      "Price data arrives with gaps, splits and outliers that quietly destroy a naive model. The bulk of this work is the cleaning and feature stage: reconciling the series before any model sees it.",
      "Forecasts are evaluated across multiple horizons rather than a single next-step prediction, because a model that looks strong one step out often collapses at five.",
      "Error is reported with several complementary metrics. Mean absolute percentage error, root mean squared error and mean absolute error disagree in useful ways on volatile series, and reporting only one hides that.",
    ],
    pipeline: [
      {
        step: 1,
        name: "Ingest & reconcile",
        detail:
          "Historical price feeds are aligned to a trading calendar with gaps and corporate actions handled explicitly.",
      },
      {
        step: 2,
        name: "Feature derivation",
        detail:
          "Rolling technical indicators and lag features are computed with strict attention to look-ahead leakage.",
      },
      {
        step: 3,
        name: "Model fitting",
        detail:
          "Statistical and learned estimators are fitted on the same split so their errors are directly comparable.",
      },
      {
        step: 4,
        name: "Horizon evaluation",
        detail:
          "Predictions are scored at several step counts using MAPE, RMSE and MAE side by side.",
      },
      {
        step: 5,
        name: "Diagnostics",
        detail:
          "Residual and trend plots surface where a model degrades rather than reporting a single headline score.",
      },
    ],
    innovations: [
      "Look-ahead leakage treated as a first-class risk: every rolling feature is computed from strictly prior observations.",
      "Multi-horizon scoring rather than single-step accuracy, exposing the decay curve of each estimator.",
      "Complementary error metrics reported together, since MAPE and RMSE rank volatile series differently.",
    ],
    invariants: [
      {
        name: "No look-ahead",
        statement:
          "A feature at time t is derived only from observations at or before t.",
      },
      {
        name: "Comparable evaluation",
        statement:
          "All estimators are scored on the identical split and horizon set, so results can be ranked honestly.",
      },
    ],
    metrics: [
      { label: "Error metrics", value: "MAPE / RMSE / MAE" },
      { label: "Evaluation", value: "Multi-horizon" },
      { label: "Build duration", value: "2 months" },
    ],
    stack: [
      { label: "Python", domain: "language" },
      { label: "Pandas", domain: "data" },
      { label: "NumPy", domain: "data" },
      { label: "Statsmodels", domain: "data" },
      { label: "Scikit-Learn", domain: "data" },
      { label: "Matplotlib", domain: "data" },
    ],
    links: [
      {
        kind: "notebook",
        label: "Notebook",
        href: "https://colab.research.google.com/drive/1EgYtgzCwlo96-IqoegKlFfIBC6pwYN3n",
      },
    ],
  },
  {
    slug: "image-captioning",
    title: "Multimodal Captioning Pipeline",
    subtitle: "COCO Annotation & Dataset Engineering",
    category: "Data & Analytics",
    timeline: "2 months",
    scope: "Solo · notebook-distributed research",
    flagship: false,
    cover: captioningCover,
    coverAlt:
      "Annotated image tiles with bounding boxes resolving into tokenised caption records, one flagged as unmatched",
    summary:
      "A preprocessing and captioning workflow over high-volume COCO image-text pairs, with structured annotation validation, caption tokenisation and pipeline diagnostics.",
    overview: [
      "COCO is large enough that a single malformed annotation is easy to miss and expensive to debug downstream. This pipeline validates annotation structure up front so failures surface at ingest rather than during training.",
      "Image-caption mappings are visualised directly, which turned out to be the fastest way to catch misaligned pairs that pass schema validation but are semantically wrong.",
      "The work is deliberately about the data layer. Model quality on a multimodal task is bounded by annotation quality, so that is where the effort went.",
    ],
    pipeline: [
      {
        step: 1,
        name: "Load & validate",
        detail:
          "COCO annotation structure is checked against the expected schema before any image is decoded.",
      },
      {
        step: 2,
        name: "Pair resolution",
        detail:
          "Image identifiers are joined to their captions, with unmatched records reported rather than dropped silently.",
      },
      {
        step: 3,
        name: "Caption tokenisation",
        detail:
          "Captions are normalised and tokenised into a consistent vocabulary for downstream consumption.",
      },
      {
        step: 4,
        name: "Visual diagnostics",
        detail:
          "Sampled image-caption pairs are rendered together to catch semantic misalignment that schema checks miss.",
      },
    ],
    innovations: [
      "Annotation validation placed ahead of decoding, so structural faults fail fast instead of corrupting a training run.",
      "Visual inspection of sampled pairs as a routine diagnostic, catching mislabelled data that passes schema validation.",
      "Unmatched records surfaced explicitly rather than filtered away, keeping dataset loss visible and measurable.",
    ],
    invariants: [
      {
        name: "No silent drops",
        statement:
          "Records that fail to resolve are counted and reported; the pipeline never discards data without an audit line.",
      },
      {
        name: "Schema before decode",
        statement:
          "Annotation structure is validated before image decoding, so malformed input costs nothing to reject.",
      },
    ],
    metrics: [
      { label: "Dataset", value: "COCO image-text" },
      { label: "Focus", value: "Data integrity" },
      { label: "Build duration", value: "2 months" },
    ],
    stack: [
      { label: "Python", domain: "language" },
      { label: "PyTorch", domain: "data" },
      { label: "OpenCV", domain: "data" },
      { label: "COCO API", domain: "data" },
      { label: "Matplotlib", domain: "data" },
    ],
    links: [
      {
        kind: "notebook",
        label: "Notebook",
        href: "https://colab.research.google.com/drive/1ANhwksa7q8_-Nf-rhX6V6DuEBqD22LSg",
      },
    ],
  },
];

/** Filter buckets rendered as pills above the grid, in display order. */
export const projectCategories = [
  "Applied AI & GraphRAG",
  "Full-Stack Platforms",
  "Data & Analytics",
] as const;
