/* eslint-disable @typescript-eslint/no-unused-expressions */
// Run with the Playwright browser_run_code tool's filename argument.
// Open the local portfolio first. This checks real browser scroll restoration.
async (page) => {
  const errors = [];
  const collectError = error => errors.push(error.message);
  const results = [];
  const url = page.url().split('#')[0];

  page.on('pageerror', collectError);
  try {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(url);
      await page.bringToFront();
      await page.waitForFunction(() => !!document.querySelector('.scroll-progress span')?.getAttribute('style'));
      for (let attempt = 0; attempt < 3; attempt++) {
        await page.evaluate(() => {
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
        });
        await page.waitForFunction(() => scrollY > 1000);
        await page.reload();
        await page.waitForFunction(() => !!document.querySelector('.scroll-progress span')?.getAttribute('style'));
        await page.waitForFunction(() => scrollY > 1000);
        await page.waitForFunction(() => getComputedStyle(document.querySelector('.experience-card')).opacity === '1');
        results.push({ width, attempt, restoredY: await page.evaluate(() => scrollY) });
      }
    }
    if (errors.length) throw new Error(errors.join('\n'));
    return { results, errors };
  } finally {
    page.off('pageerror', collectError);
  }
}