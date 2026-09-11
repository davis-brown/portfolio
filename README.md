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
| **Cloudflare Workers + static assets** | Serves `dist/` (free and unlimited) and runs one endpoint, `/api/contact`, which sends mail via the Email Service binding. |

No UI library, no CSS-in-JS, no state manager. The terminal and theme toggle are
plain inline scripts; nothing is hydrated.

## Commands

```bash
npm install
npm run dev       # Astro dev server, localhost:4321 (no Worker)
npm run build     # -> dist/
npm run preview   # build + wrangler dev, localhost:8787 (Worker + assets)
npm run deploy    # build + wrangler deploy
npm run check     # wrangler types + astro check + tsc on the Worker
```

Use `npm run dev` for design work and `npm run preview` when you need the
contact form, the 404 route or `_headers` — those only exist under the Worker.

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

The form posts to `/api/contact`, handled by [`src/worker.ts`](src/worker.ts),
which sends through the Cloudflare Email Service binding. No third party, no API
key. It is free: sends to a **verified destination address** do not count toward
any quota on any plan.

Before it will deliver, do this once in the Cloudflare dashboard:

1. **Email Routing** on `davisbrown.dev` (Compute > Email Service > Email
   Routing > Onboard Domain). This adds the MX/SPF/DKIM records.
2. **Verify your inbox** under Destination Addresses and click the link in the
   confirmation email. Until you do, sends fail.
3. Put that address in [`wrangler.jsonc`](wrangler.jsonc) in **both**
   `vars.CONTACT_TO` and `send_email[0].destination_address`. The var addresses
   the mail; the binding restriction is what enforces that it cannot go
   anywhere else.
4. Check `vars.CONTACT_FROM` is on a domain you have onboarded — you may only
   send *from* your own routing domains.

The form still posts normally with JS disabled; the script adds inline
validation and the success state. `wrangler dev` simulates sends and writes the
message body to `.wrangler/tmp/email/`, so you can test without delivering.

## Deploying (Cloudflare Workers)

`npm run deploy`, or connect the repo to Workers Builds with build command
`npm run build`. The site is a Worker serving static assets: asset requests are
free and unlimited, and only `/api/contact` invokes code.

Set `site` in [`astro.config.mjs`](astro.config.mjs) to the real domain before
launch — the sitemap, RSS feed and canonical URLs are built from it.

**Why Workers and not Pages:** Pages Functions support only a subset of
bindings, and email is not among them. Pages is not deprecated and would work
via the Email Service REST API, but that means creating and rotating a
Cloudflare API token. The binding needs no credential.

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
- **There are two tsconfigs.** The Workers runtime declares globals (`Response`,
  `ReadableStream`) that shadow the DOM lib and break the browser-side scripts,
  so `tsconfig.json` excludes the Worker and `tsconfig.worker.json` typechecks it
  alone. `npm run check` runs both.
- **`_headers` does not apply to Worker responses**, only to static assets. The
  `/api/contact` response sets its own headers.
- **`worker-configuration.d.ts` is generated** by `wrangler types` and gitignored;
  `npm run check` regenerates it.
