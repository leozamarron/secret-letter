const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 12 Pro dimensions
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const filePath = `file://${path.resolve('index.html')}`;
  console.log(`Navigating to ${filePath}`);
  await page.goto(filePath);

  await page.waitForLoadState('networkidle');

  // click envelope wrapper to open it using force to bypass stability issues from animation
  await page.click('.envelope-wrapper', { force: true });

  // wait a bit for animation to finish
  await page.waitForTimeout(2000);

  await page.screenshot({ path: '/home/jules/verification/envelope_open.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved');
})();
