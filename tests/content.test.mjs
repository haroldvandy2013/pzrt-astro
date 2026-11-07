import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { parse } from 'yaml';
import { youtubeId, padletUrl, mediaPath, withBase, contentUrl } from '../src/lib/urls.mjs';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeSanitize from 'rehype-sanitize';
import { contentUrls } from '../src/lib/urls.mjs';

test('YouTube accepts IDs and official HTTPS video URLs only', () => {
  for (const input of [
    'jwXFh2uTBIM', 'https://youtu.be/jwXFh2uTBIM?si=abc',
    'https://www.youtube.com/watch?v=jwXFh2uTBIM&list=example',
    'https://youtube.com/shorts/jwXFh2uTBIM',
    'https://m.youtube.com/embed/jwXFh2uTBIM/',
  ]) assert.equal(youtubeId(input), 'jwXFh2uTBIM');
  for (const input of [
    '', 'short', 'https://youtube.com.evil.test/watch?v=jwXFh2uTBIM',
    'javascript:alert(1)', 'http://youtu.be/jwXFh2uTBIM',
    'https://user:pass@youtube.com/watch?v=jwXFh2uTBIM',
    'https://youtube.com:444/watch?v=jwXFh2uTBIM',
    'https://youtu.be/jwXFh2uTBIM/extra',
  ]) assert.throws(() => youtubeId(input));
});

test('Padlet has a genuine empty state and validates official board URLs', () => {
  assert.equal(padletUrl(''), '');
  assert.equal(padletUrl('https://padlet.com/example/new-board'), 'https://padlet.com/example/new-board');
  assert.equal(padletUrl('https://padlet.com/embed/board123'), 'https://padlet.com/embed/board123');
  for (const input of [
    'https://padlet.com.evil.test/embed/a', 'https://example.org/board',
    'http://padlet.com/embed/a', 'https://user:pass@padlet.com/embed/a',
    'https://padlet.com/embed/a?key=secret', '//padlet.com/embed/a',
    'https://padlet.com/', 'https://padlet.com:444/embed/a',
  ]) assert.throws(() => padletUrl(input));
});

test('Internal URLs and CMS media work with project and future root base paths', () => {
  assert.equal(withBase('/blog/', '/pzrt-astro/'), '/pzrt-astro/blog/');
  assert.equal(withBase('/pzrt-astro/media/photo.jpg', '/pzrt-astro/'), '/pzrt-astro/media/photo.jpg');
  assert.equal(withBase('/media/photo.jpg', '/'), '/media/photo.jpg');
  assert.equal(contentUrl('/media/photo.jpg', '/pzrt-astro/'), '/pzrt-astro/media/photo.jpg');
  assert.equal(contentUrl('https://www.pzrt.org/post/the-story-of-pzrt', '/pzrt-astro/'), '/pzrt-astro/post/the-story-of-pzrt');
  assert.equal(contentUrl('https://www.pzrt.org/post/the-story-of-pzrt', '/'), '/post/the-story-of-pzrt');
  assert.equal(contentUrl('mailto:fingerag@drexel.edu', '/'), 'mailto:fingerag@drexel.edu');
  assert.equal(contentUrl('#topic', '/'), '#topic');
  assert.equal(mediaPath('/media/subfolder/photo.webp'), true);
  for (const input of ['/media/../secret', '//evil.test', '/media/a.svg', 'https://example.com/a.jpg']) {
    assert.equal(mediaPath(input), false);
  }
  for (const input of ['//evil.test', '/a/../b', '/a\\b', 'javascript:alert(1)']) {
    assert.throws(() => contentUrl(input, '/pzrt-astro/'));
  }
});

test('Markdown rewrites CMS uploads and removes active HTML', async () => {
  const processor = await createMarkdownProcessor({
    remarkPlugins: [[contentUrls, { base: '/pzrt-astro/' }]],
    rehypePlugins: [rehypeSanitize],
  });
  const result = await processor.render('![Photo](/media/photo.jpg)\n\n[Videos](https://www.pzrt.org/videos)\n\n<script>alert(1)</script>\n\n<img src="/media/photo.jpg" onerror="alert(1)">');
  assert.match(result.code, /\/pzrt-astro\/media\/photo\.jpg/);
  assert.match(result.code, /href="\/pzrt-astro\/videos"/);
  assert.doesNotMatch(result.code, /<script|onerror=/);
  await assert.rejects(() => processor.render('[Unsafe](javascript:alert(1))'));
});

test('CMS exposes maintainable files, article bodies and validated video fields', async () => {
  const cms = parse(await readFile('.pages.yml', 'utf8'));
  assert.equal(cms.media.input, 'public/media');
  assert.equal(cms.media.output, '/media');
  assert.ok(!cms.media.extensions.some((extension) => ['mp4', 'webm', 'mov'].includes(extension)));
  const articles = cms.content.find((entry) => entry.name === 'articles');
  assert.equal(articles.fields.find((field) => field.name === 'body').type, 'rich-text');
  const video = cms.content.find((entry) => entry.name === 'videos');
  const regex = new RegExp(video.fields.find((field) => field.name === 'youtube').pattern.regex);
  assert.ok(regex.test('https://www.youtube.com/watch?v=jwXFh2uTBIM'));
  assert.ok(!regex.test('https://evil.test/watch?v=jwXFh2uTBIM'));
  const site = JSON.parse(await readFile('content/site.json', 'utf8'));
  assert.doesNotThrow(() => padletUrl(site.padletUrl));
  assert.match(site.contactEmail, /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  for (const file of await readdir('content/videos')) {
    const entry = JSON.parse(await readFile(`content/videos/${file}`, 'utf8'));
    assert.ok(youtubeId(entry.youtube));
  }
});
