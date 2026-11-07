import settings from '../../content/site.json';
import { z } from 'astro/zod';
import { mediaPath, padletUrl, withBase } from './urls.mjs';

const requiredText = z.string().trim().min(1);
const image = requiredText.refine(mediaPath, 'Images must be uploaded to /media/.');

export const site = z.object({
  name: requiredText,
  tagline: requiredText,
  intro: z.array(requiredText).min(1),
  logo: image,
  contactImage: image,
  contactAlt: requiredText,
  contactName: requiredText,
  contactEmail: z.email(),
  contactText: requiredText,
  padletUrl: z.string().refine((value) => {
    try { padletUrl(value); return true; } catch { return false; }
  }, 'Use an HTTPS padlet.com board URL, or leave this empty.'),
  gallery: z.array(z.object({
    image,
    alt: requiredText,
    caption: requiredText,
  })).min(1),
}).parse(settings);

export const href = (path: string) => withBase(path, import.meta.env.BASE_URL);
export const contactHref = `mailto:${site.contactEmail}`;
export const channelUrl = 'https://www.youtube.com/channel/UC7GZ0ZlejLcISfFaFMy5Rdw';
export const dateLabel = (date: Date, includeYear = date.getUTCFullYear() !== new Date().getUTCFullYear()) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', ...(includeYear ? { year: 'numeric' } : {}), timeZone: 'UTC' }).format(date);
