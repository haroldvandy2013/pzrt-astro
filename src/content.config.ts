import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { mediaPath, youtubeId } from './lib/urls.mjs';

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/articles' }),
  schema: z.object({
    title: z.string().trim().min(1),
    date: z.coerce.date(),
    author: z.string().trim().min(1),
    summary: z.string().trim().min(1).max(500),
    cover: z.string().refine(mediaPath, 'Upload the cover image to /media/.'),
    coverAlt: z.string().trim().min(1),
    draft: z.boolean().default(false),
    sourceUrl: z.preprocess((value) => value === '' ? undefined : value, z.url().refine((value) => {
      const url = new URL(value);
      return url.origin === 'https://www.pzrt.org' && url.pathname.startsWith('/post/');
    }).optional()),
    migrationStatus: z.preprocess((value) => value === '' ? undefined : value, z.enum(['complete', 'excerpt']).default('complete')),
  }).refine((data) => data.migrationStatus !== 'excerpt' || !!data.sourceUrl, 'An excerpt must link to its original article.'),
});

const videos = defineCollection({
  loader: glob({ pattern: '*.json', base: './content/videos' }),
  schema: z.object({
    title: z.string().trim().min(1),
    youtube: z.string().refine((value) => {
      try { youtubeId(value); return true; } catch { return false; }
    }, 'Enter a valid YouTube video ID or HTTPS YouTube link.'),
    order: z.number().int().nonnegative(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, videos };
