import { chromium, expect, test } from "@playwright/test";

test("Playwright tests", () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });
  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    page = await browser.newPage();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("should load the homepage", async () => {
    await page.goto("http://localhost:3000/");
    const title = await page.title();
    expect(title).toBe("My App");
  });

  it("should fetch data from the server", async () => {
    await page.goto("http://localhost:3000/");
    const response = await page.evaluate(() => {
      return fetch("/api/test").then((res) => res.text());
    });
    expect(response).toBe("Hello from server!");
  });
});
