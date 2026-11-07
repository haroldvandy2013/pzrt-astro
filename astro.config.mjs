import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import { contentUrls } from './src/lib/urls.mjs';
import { articleHtmlSchema, contentHtmlUrls } from './src/lib/markdown.mjs';

export default defineConfig({
  site: 'https://haroldvandy2013.github.io',
  base: '/pzrt-astro/',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      remarkPlugins: [[contentUrls, { base: '/pzrt-astro/' }]],
      rehypePlugins: [rehypeRaw, [rehypeSanitize, articleHtmlSchema], [contentHtmlUrls, { base: '/pzrt-astro/' }]],
    }),
  },
});
