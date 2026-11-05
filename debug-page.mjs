import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

page.on('pageerror', (err) => {
  console.log('PAGEERROR:' + err.message);
});

page.on('console', (msg) => {
  console.log('BROWSERLOG:' + msg.type() + ':' + msg.text());
});

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
console.log('TITLE:' + await page.title());
console.log('BODY:' + await page.locator('body').innerText());
await browser.close();
