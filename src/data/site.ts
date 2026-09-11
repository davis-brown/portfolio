
export const site = {
  name: 'Davis Brown',
  role: 'Senior Software Engineer',
  tagline: 'Senior Software Engineer · Full-stack · Oklahoma City',
  email: 'contact@davisbrown.dev',
  location: 'Oklahoma City · UTC−5',
  year: 2026,
  description:
    'Senior full-stack engineer — five years on enterprise HR and AI-assisted products in React, TypeScript, GraphQL, PHP, C# and Go. Builder of Pull Up, a live map of pickup basketball.',
} as const;

export const nav = [
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const links = {
  github: 'https://github.com/davis-brown',
  linkedin: 'https://www.linkedin.com/in/davisbrown245',
  resume: '/Davis_Brown_CV.pdf',
  appStore: '#',
  googlePlay: '#',
  webApp: '#',
  // PLACEHOLDER — the Pull Up repo, not the profile.
  source: 'https://github.com/davis-brown',
} as const;

/* ── Home ─────────────────────────────────────────────────────────────── */

export const home = {
  eyebrow: site.tagline,
  h1: 'I ship full-stack products, end to end.',
  lead:
    'Go on the server, React Native in your hand, PostGIS underneath. I own the schema, the API, and the gesture — most recently on Pull Up, a live map of pickup basketball.',
  primaryCta: { label: 'See the project →', href: '/projects' },
  secondaryCta: { label: 'Get in touch', href: '/contact' },
  contactIntro:
    'Hiring for a senior full-stack role, or want to talk maps and Go? I reply within a day.',
} as const;

/* ── Pull Up ──────────────────────────────────────────────────────────── */

export const project = {
  name: 'Pull Up',
  status: 'live · 2026',
  statusLong: 'live · iOS · Android · web',
  summary:
    "Find live pickup basketball. A map of courts showing who's playing right now. Court locations are crowd-sourced and seeded from OpenStreetMap; live activity comes from geo-verified check-ins and crowd reports.",
  chips: ['Go', 'PostgreSQL + PostGIS', 'Expo · React Native', 'MapLibre', 'iOS · Android · web'],
  mapCaption: '[ map screenshot — courts near Mission District ]',
  mapPin: { label: 'Dolores · 8 playing', left: '34%', top: '46%' },
} as const;

/** Home: the three package cards under the featured card. */
export const packages = [
  {
    folder: 'server/',
    tech: 'Go',
    title: 'The API',
    body: 'chi, pgx + sqlc, goose migrations on PostgreSQL + PostGIS. Radius queries, presence, crowd reports.',
  },
  {
    folder: 'app/',
    tech: 'TypeScript · Expo',
    title: 'The app',
    body: 'One React Native codebase for iOS, Android and web, with a full design system in light and dark.',
  },
  {
    folder: 'maps/',
    tech: 'MapLibre',
    title: 'The maps',
    body: 'OpenStreetMap-seeded courts on OpenFreeMap tiles, native and web renderers. No map API keys.',
  },
] as const;

/* ── Projects page ────────────────────────────────────────────────────── */

export const projectsPage = {
  eyebrow: '1 project · 3 packages · 2026',
  h1: 'Projects',
  lead:
    'One product, built end to end. Below is the case study — what it is, how it’s built, and the decisions that mattered.',

  tiles: [
    { term: 'role', value: 'Sole engineer — schema to gesture' },
    { term: 'server', value: 'Go · chi · pgx + sqlc · goose · PostGIS' },
    { term: 'app', value: 'Expo · React Native · MapLibre' },
    { term: 'data', value: 'OpenStreetMap seed · OpenFreeMap tiles · 0 API keys' },
  ],

  // PLACEHOLDER — two real paragraphs on the problem.
  problem: [
    '[ the problem — what was broken about finding a pickup game, who felt it, and why existing apps and group chats did not solve it ]',
    '[ the problem, continued — what you decided the product had to prove, and the constraint that shaped the build ]',
  ],

  build: [
    {
      folder: 'server/',
      tech: 'Go',
      body: 'A Go API on chi, typed queries via pgx + sqlc, goose migrations. PostGIS does the heavy lifting: radius search, court dedup on import, and geo-verification of check-ins against court polygons.',
    },
    {
      folder: 'app/',
      tech: 'TypeScript · Expo',
      body: 'One Expo codebase for iOS, Android and web. MapLibre native on device, react-map-gl/maplibre on web, behind one map component. A Barlow-based design system with light and dark runs across every screen.',
    },
    {
      folder: 'data/',
      tech: 'OSM',
      body: 'Courts seeded from OpenStreetMap, then corrected by the crowd. Tiles from OpenFreeMap — production maps with no API keys and no per-load billing.',
    },
  ],

  decisions: [
    {
      n: '01',
      lead: 'sqlc over an ORM',
      body: 'Typed Go from real SQL. The queries stay readable, PostGIS functions are first-class instead of escape hatches, and the compiler catches a schema change before the tests do.',
    },
    {
      n: '02',
      lead: 'Geo-verified check-ins',
      body: 'A check-in only counts if the device is inside the court polygon. Trust the phone, not the user — it keeps the live count honest without any moderation queue.',
    },
    {
      n: '03',
      lead: 'MapLibre + OpenFreeMap',
      body: 'No map API keys, no per-load billing, no vendor that can reprice the core of the product overnight. Native and web renderers sit behind one component.',
    },
    {
      n: '04',
      lead: 'Seed, then crowd-source',
      body: 'Two thousand courts from OpenStreetMap on day one so the map is never empty, then let players correct and add. Cold start solved with data that already existed.',
    },
  ],
} as const;

/* ── About page ───────────────────────────────────────────────────────── */

export const about = {
  eyebrow: site.tagline,
  h1: 'Senior engineer who owns the whole stack.',
  bio: [
    'Senior full-stack engineer with five years building enterprise HR and AI-assisted products — React and TypeScript on the front, GraphQL APIs in PHP and C#, Go services underneath. I have shipped secure document and e-signature workflows against real compliance requirements, and kept production services healthy when they were not.',
    'On my own time I build Pull Up — a live map of pickup basketball, Go and PostGIS on the server, one Expo codebase on iOS, Android and web. I work test-first, take incidents seriously, and spend as much time mentoring as writing features. What I want next is ownership of a whole path: the schema, the API and the interface, with a real user at the end of it.',
  ],
  // Short version, used on the Home about block.
  bioShort:
    'Senior full-stack engineer with five years building enterprise HR and AI-assisted products — React and TypeScript on the front, GraphQL APIs in PHP and C#, Go services underneath. I work test-first, take incidents seriously, and mentor as much as I ship.',

  stack: [
    { term: 'languages', value: 'TypeScript · PHP · C# · Go · SQL' },
    { term: 'frontend', value: 'React · React Native · Expo · Redux · Vue.js · Astro · Vite' },
    { term: 'backend', value: 'Node.js · Express · GraphQL · MySQL · PostgreSQL · PostGIS' },
    { term: 'infra', value: 'Kubernetes · Docker · Jest · Splunk · Postman · Swagger' },
  ],

  /** Home's short dl — a two-line version of the stack above. */
  quickStack: [
    { term: 'frontend', value: 'TypeScript · React · React Native · Expo · Astro' },
    { term: 'backend', value: 'Go · PHP · C# · GraphQL · PostgreSQL · PostGIS' },
  ],

  experience: [
    {
      years: 'Jun 2026 — now',
      role: 'Pull Up — founder & sole engineer',
      note: 'Schema to gesture: Go API, PostgreSQL + PostGIS, Expo app on iOS, Android and web.',
    },
    {
      years: '2025 — 2026',
      role: 'Senior Software Developer — Paycom',
      note: 'AI-assisted chat: React frontend, GraphQL APIs in PHP and C#, Go platform services. Mentored junior developers across teams.',
    },
    {
      years: '2021 — 2025',
      role: 'Software Developer — Paycom',
      note: 'Secure document upload, e-signature and confidential data workflows. Introduced TDD and took coverage on critical paths to 95%.',
    },
    {
      years: '2021',
      role: 'BS Computer Science with Cybersecurity — Oklahoma Christian University',
      note: 'Recipient, Founders’ Scholarship.',
    },
  ],

  now: 'Open to senior full-stack roles · remote or Oklahoma City',
  nowNote: 'Happiest with a hard problem, a real user, and ownership of the whole path between them.',
} as const;

/* ── Writing page ─────────────────────────────────────────────────────── */

export const writing = {
  h1: 'Writing',
  eyebrowSuffix: 'mostly APIs, testing and shipping',
} as const;

/* ── Contact page ─────────────────────────────────────────────────────── */

export const contact = {
  eyebrow: 'Open to senior full-stack roles · replies within a day',
  h1: 'Let’s talk about the role, or about maps.',
  formHint: 'or just email — the form goes to the same inbox',
  success: 'Thanks — that’s in my inbox. I’ll reply within a day.',
  formEndpoint: 'https://api.web3forms.com/submit',
  /**
   * PLACEHOLDER — your Web3Forms access key (web3forms.com, enter your email
   * and it is mailed to you). It is designed to be public, so committing it is
   * fine; it only authorises delivery to the address you registered.
   * Until this is set, the form validates and reports that it is not wired.
   */
  accessKey: '2b52d2d4-0016-4234-bfb6-877a13733be3',
  /** Subject line on the mail that reaches your inbox. */
  formSubject: 'Portfolio contact — davisbrown.dev',
} as const;

/* ── Terminal easter egg ──────────────────────────────────────────────── */

export const terminal = {
  hint: 'Optional: there’s a small terminal here for the curious. Type',
  hintCmd: 'help',
  enterHint: 'Enter to run',
} as const;
