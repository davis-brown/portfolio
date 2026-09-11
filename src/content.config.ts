import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** One-line summary shown on the Writing index and the featured card. */
    summary: z.string(),
    date: z.coerce.date(),
    /** Reading time in minutes — shown in the mono meta column. */
    minutes: z.number().int().positive(),
    /** Cover for the featured card; optional, falls back to the stripe pattern. */
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
