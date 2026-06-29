import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.env.URL || "http://localhost:3000";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
  defaultViewport: { width: 1440, height: 900 },
});
const page = await browser.newPage();
await page.goto(URL, { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 800));

// 1) Hover Oski panel -> renk + bio açılması
await page.hover(".panel--oski");
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: "t-hover.png" });

// 2) Tıkla -> modal
await page.click(".panel--oski");
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: "t-modal.png" });

await browser.close();
console.log("shots ok");
