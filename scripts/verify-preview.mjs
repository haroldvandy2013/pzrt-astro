import { chromium, expect } from '@playwright/test';
import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const url = process.argv[2];
const output = process.argv[3];
const settings = JSON.parse(await readFile('content/site.json', 'utf8'));
const videos = JSON.parse(await readFile('content/videos/01-supreme-court.json', 'utf8'));
if (!url || !output) throw new Error('Usage: node scripts/verify-preview.mjs <preview-url> <screenshot-directory>');
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toContainText('Who We Are');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.locator('.poster-slide:not([hidden]) img')).toBeVisible();
    await expect(page.locator('.poster-slide:not([hidden])')).toHaveCount(1);
    await page.getByRole('button', { name: 'Next poster' }).click();
    await expect(page.locator('.poster-thumbnail[aria-current=true]')).toHaveAttribute('data-slide-index', '1');
    await page.getByRole('button', { name: 'Previous poster' }).click();
    await expect(page.locator('.poster-thumbnail[aria-current=true]')).toHaveAttribute('data-slide-index', '0');
    const header = await page.locator('.site-header').boundingBox();
    if (name === 'desktop') {
      expect(Math.abs(header.height - 291)).toBeLessThan(15);
      const intro = await page.locator('.intro-content').boundingBox();
      expect(intro.width).toBe(780);
      expect(await page.locator('.brand-name').evaluate((element) => getComputedStyle(element).fontFamily)).toContain('Dancing Script');
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: join(output, `pzrt-${name}.png`), fullPage: true });
    if (name === 'mobile') {
      await expect(page.locator('#site-navigation')).toBeHidden();
      await page.getByRole('button', { name: 'Menu' }).click();
      await expect(page.locator('#site-navigation')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('#site-navigation')).toBeHidden();
    }
    const root = new URL(url);
    for (const path of ['blog/', 'blog/page/2/', 'videos/', 'bulletin-wall-2021/', 'contact/', 'post/the-story-of-pzrt/', 'post/zoom-enchanted-evenings/']) {
      const response = await page.goto(new URL(path, root).href, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const brokenImages = await page.locator('img').evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
      expect(brokenImages).toEqual([]);
      await expect(page.locator('form')).toHaveCount(0);
      await expect(page.locator(`a[href="mailto:${settings.contactEmail}"]`).first()).toBeAttached();
      if (path === 'videos/') {
        await expect(page.locator('.video-card:not([hidden])')).toHaveCount(6);
        await expect(page.locator('iframe')).toHaveCount(0);
        await page.locator('.video-load').first().click();
        await expect(page.locator('.video-dialog')).toBeVisible();
        await expect(page.locator('iframe')).toHaveAttribute('src', new RegExp(`youtube-nocookie\\.com/embed/${videos.youtube}`));
        await page.keyboard.press('Escape');
        await expect(page.locator('iframe')).toHaveCount(0);
        await page.getByRole('button', { name: 'Load More' }).click();
        await expect(page.locator('.video-card:not([hidden])')).toHaveCount(12);
        while (await page.getByRole('button', { name: 'Load More' }).isVisible()) {
          await page.getByRole('button', { name: 'Load More' }).click();
        }
        await expect(page.locator('.video-card:not([hidden])')).toHaveCount(23);
      }
      if (path === 'blog/') {
        await page.getByRole('searchbox', { name: 'Search articles' }).fill('no shame');
        await expect(page.locator('.article-search-item:not([hidden])')).toHaveCount(1);
        await page.getByRole('searchbox', { name: 'Search articles' }).fill('');
      }
      if (path === 'post/zoom-enchanted-evenings/') {
        await expect(page.locator('.source-video')).toHaveAttribute('data-youtube-id', 'wzO0S1mRBJ8');
        await expect(page.locator('.source-video iframe')).toHaveCount(0);
        await page.locator('.inline-video-play').click();
        await expect(page.locator('.source-video iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/wzO0S1mRBJ8/);
      }
      if (path === 'bulletin-wall-2021/') {
        await expect(page.locator('iframe')).toHaveAttribute('src', settings.padletUrl);
        await expect(page.frameLocator('iframe').getByText('Bulletin Wall - PZRT 2021', { exact: true }).first()).toBeVisible({ timeout: 30000 });
        await page.screenshot({ path: join(output, `pzrt-bulletin-${name}.png`), fullPage: true });
      }
    }
    expect(errors).toEqual([]);
    await page.close();
  }
  console.log('Verified desktop and mobile layouts, article pagination, all 23 videos, contact links, original Padlet board, and click-to-load YouTube players.');
} finally {
  await browser.close();
}
