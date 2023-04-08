import { test, webkit, chromium, firefox } from "@playwright/test";

let browser;

const beforeEach = async ({ page }, testInfo) => {
  const { browserType, url } = testInfo;
  browser = await { chromium, firefox, webkit }[browserType].launch();
  page = await browser.newPage();
  await page.goto(url);
};

test.beforeEach(beforeEach);

export { beforeEach };
