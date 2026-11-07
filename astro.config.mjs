import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeSanitize from 'rehype-sanitize';
import { contentUrls } from './src/lib/urls.mjs';

export default defineConfig({
  site: 'https://haroldvandy2013.github.io',
  base: '/pzrt-astro/',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      remarkPlugins: [[contentUrls, { base: '/pzrt-astro/' }]],
      rehypePlugins: [rehypeSanitize],
    }),
  },
});
