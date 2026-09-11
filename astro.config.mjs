// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Placeholder — swap for the real domain before launch. Required by sitemap + RSS.
  site: 'https://davisbrown.dev',
  integrations: [mdx(), sitemap()],

  // Astro 7 defaults compressHTML to 'jsx', which collapses whitespace between
  // inline elements across line breaks. The design leans on HTML whitespace
  // ("<span>●</span> live · 2026", chip rows, the dl in About), so use the
  // HTML-aware compressor instead of the JSX one.
  compressHTML: true,
});
