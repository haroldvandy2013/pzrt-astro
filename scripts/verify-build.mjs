import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

const base = '/pzrt-astro/';
const settings = JSON.parse(await readFile('content/site.json', 'utf8'));
const pages = [];
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) pages.push(path);
  }
}
await walk('dist');
assert.ok(pages.includes('dist/index.html'));
for (const path of pages) {
  const html = await readFile(path, 'utf8');
  assert.doesNotMatch(html, /<form\b|Let's Chat|Sign Up/);
  assert.ok(html.includes(`mailto:${settings.contactEmail}`));
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const value = match[1].replace(/&amp;/g, '&');
    assert.ok(value.startsWith(base), `${path}: URL misses project base: ${value}`);
    const pathname = new URL(value, 'https://example.org').pathname;
    let target = join('dist', decodeURIComponent(pathname.slice(base.length)));
    let info;
    try { info = await stat(target); } catch { assert.fail(`${path}: broken link or asset ${value}`); }
    if (info.isDirectory()) target = join(target, 'index.html');
    await stat(target);
  }
}
const articles = (await readdir('content/articles')).filter((file) => file.endsWith('.md'));
for (const article of articles) {
  const text = await readFile(`content/articles/${article}`, 'utf8');
  const frontmatter = parse(text.match(/^---\n([\s\S]*?)\n---/)?.[1] || '');
  if (!frontmatter.draft) await stat(`dist/post/${article.slice(0, -3)}/index.html`);
}
const board = await readFile('dist/bulletin-wall-2021/index.html', 'utf8');
if (!settings.padletUrl) {
  assert.match(board, /Not connected yet/);
  assert.doesNotMatch(board, /<iframe/);
} else {
  assert.match(board, /https:\/\/padlet\.com\/embed\//);
}
const videos = await readFile('dist/videos/index.html', 'utf8');
const videoFiles = await readdir('content/videos');
let publishedVideos = 0;
for (const file of videoFiles.filter((file) => file.endsWith('.json'))) {
  const video = JSON.parse(await readFile(`content/videos/${file}`, 'utf8'));
  if (!video.draft) publishedVideos++;
}
assert.equal([...videos.matchAll(/data-video-id=/g)].length, publishedVideos);
assert.doesNotMatch(videos, /<iframe/);
console.log(`Verified ${pages.length} static pages, article routes, all local links/assets, ${publishedVideos} YouTube entries, and bulletin wall state.`);
