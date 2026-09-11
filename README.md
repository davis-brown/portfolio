# davisbrown.dev

Personal portfolio and case study site.

## Stack

| | |
|---|---|
| **Astro 7** | Static output, zero client JS by default. Five content-driven pages with two small interactive bits. |
| **TypeScript** | Content collection schemas catch a malformed post at build time. |
| **Plain CSS + custom properties** | The design is a token system (`--bg`, `--acc`, `--line`…) redefined under `[data-theme="light"]`. No framework in between. |
| **MDX content collections** | `/writing` posts with typed frontmatter. |
| **@fontsource-variable** | Instrument Sans + JetBrains Mono, self-hosted — no render-blocking Google Fonts request. |
| **Cloudflare Workers + static assets** | Serves `dist/` — free and unlimited. Assets-only: no Worker code runs. |
| **Web3Forms** | Contact form delivery. Keeps the site fully static and leaves DNS alone. |

No UI library, no CSS-in-JS, no state manager. The terminal and theme toggle are
plain inline scripts; nothing is hydrated.

## Commands

```bash
npm install
npm run dev       # Astro dev server, localhost:4321 (no Worker)
npm run build     # -> dist/
npm run preview   # build + wrangler dev, localhost:8787 (assets as deployed)
npm run deploy    # build + wrangler deploy
npm run check     # astro check
```

Use `npm run dev` for design work and `npm run preview` when you need the 404
route or `_headers` — those are applied by the assets runtime, not by Astro.

## Where the content lives

| What | Where |
|---|---|
| **All page copy and links** | [`src/data/site.ts`](src/data/site.ts) — one typed file |
| Blog posts | [`src/content/posts/*.mdx`](src/content/posts/) |
| Design tokens | [`src/styles/global.css`](src/styles/global.css) |
| Images, résumé PDF | [`public/`](public/) |

Anything still marked `PLACEHOLDER` or wrapped in `[ brackets ]` is filler and
renders visibly as such in the browser.

### Still needed

- Featured map screenshot (~7:5), Projects hero (three app screens), architecture diagram
- Portrait (4:5), résumé PDF at `public/resume.pdf`
- Real bio, experience rows, email, GitHub/LinkedIn/store links
- Real posts (the four in `src/content/posts/` are placeholders)

### Wiring the contact form

The form posts to [Web3Forms](https://web3forms.com). Create a key there with
the address you want submissions delivered to, then set `contact.accessKey` in
[`src/data/site.ts`](src/data/site.ts). The key is designed to be public — it
only authorises delivery to the address you registered — so committing it is
fine. Until it is set, the form validates and reports that it is not configured.

The form posts normally with JS disabled; the script adds inline validation and
swaps in the success state without a page load. A `botcheck` honeypot is
included.

**Why not Cloudflare Email Service:** the free send path requires Email Routing
on the apex domain, and `davisbrown.dev` already points its MX at SimpleLogin —
enabling it would break `contact@davisbrown.dev`. Email Sending on its own would
avoid that (it only touches a `cf-bounce` subdomain) but needs Workers Paid.

## Deploying (Cloudflare Workers)

`npm run deploy`, or connect the repo to Workers Builds with build command
`npm run build`. The Worker declares no `main`, so it is purely a static asset
host — every request is free and no code runs.

Set `site` in [`astro.config.mjs`](astro.config.mjs) to the real domain before
launch — the sitemap, RSS feed and canonical URLs are built from it.

**Why Workers and not Pages:** largely historical — the original plan used the
Email Service binding, which Pages Functions cannot bind. Now that the form goes
through Web3Forms, either platform would serve this equally well. Workers stays
because it is set up, and its observability is better if a dynamic endpoint is
ever added back.

## Notes for whoever picks this up

- **`compressHTML: true`** is set deliberately. Astro 7 defaults to `'jsx'`,
  which collapses whitespace between inline elements across line breaks and eats
  the spaces in runs like `<span>●</span> live · 2026`.
- **Styling a child component's root element** needs `:global()` under a parent
  selector (e.g. `.feature-card :global(.feature-map)`). The child's root carries
  its *own* scope id, so a bare `.feature-map {}` in the parent silently matches
  nothing.
- **`.spine-grid > * { min-width: 0 }`** stops one wide child (a `<pre>`) from
  propping the grid column open and scrolling the whole page sideways.
- **Post dates are formatted in UTC** ([`src/lib/date.ts`](src/lib/date.ts)).
  Date-only frontmatter parses as UTC midnight, so formatting in a local zone
  west of UTC renders the previous day.
- **The light palette is darkened from canonical Tokyo Night Day** to reach
  WCAG AA. See the comment in `global.css`; the original values are noted there.
- **`_headers` applies to static assets only.** If Worker code is ever added
  back, its responses must set their own headers.
