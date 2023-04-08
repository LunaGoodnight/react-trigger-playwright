import { chromium, Browser, Page } from "@playwright/test";

interface TestOptions {
  url: string;
  browserType: "chromium" | "firefox" | "webkit";
}

export const runTest = async ({ url, browserType }: TestOptions) => {
  let browser: Browser;
  let page: Page;

  beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  it("should load the page", async () => {
    await page.goto(url);
    const title = await page.title();
    expect(title).toBe("My Page Title");
  });
};
