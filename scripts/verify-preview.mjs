import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const url = process.argv[2];
const output = process.argv[3];
if (!url || !output) throw new Error('Usage: node scripts/verify-preview.mjs <preview-url> <screenshot-directory>');
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('h1')).toContainText('Many voices.');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.locator('.hero-visual img')).toBeVisible();
    await page.screenshot({ path: join(output, `pzrt-${name}.png`), fullPage: true });
    if (name === 'mobile') {
      await expect(page.locator('#site-navigation')).toBeHidden();
      await page.getByRole('button', { name: 'Menu' }).click();
      await expect(page.locator('#site-navigation')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('#site-navigation')).toBeHidden();
    }
    const root = new URL(url);
    for (const path of ['blog/', 'videos/', 'bulletin-wall-2021/', 'contact/', 'post/the-story-of-pzrt/']) {
      const response = await page.goto(new URL(path, root).href, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const brokenImages = await page.locator('img').evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
      expect(brokenImages).toEqual([]);
      await expect(page.locator('form')).toHaveCount(0);
      if (path === 'videos/') {
        await expect(page.locator('.video-load')).toHaveCount(6);
        await expect(page.locator('iframe')).toHaveCount(0);
        await page.locator('.video-load').first().click();
        await expect(page.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/jwXFh2uTBIM/);
        await expect(page.locator('.video-frame').first().getByRole('button')).toHaveCount(0);
      }
      if (path === 'bulletin-wall-2021/') {
        await expect(page.getByText('Not connected yet')).toBeVisible();
        await expect(page.locator('iframe')).toHaveCount(0);
        await page.screenshot({ path: join(output, `pzrt-bulletin-${name}.png`), fullPage: true });
      }
    }
    expect(errors).toEqual([]);
    await page.close();
  }
  console.log('Verified desktop and mobile layouts, nested page reloads, contact links, empty bulletin wall, and click-to-load YouTube players.');
} finally {
  await browser.close();
}
