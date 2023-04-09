import { chromium, expect, test, Page } from "@playwright/test";

const runTest = async (test?: { page: any }) => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = test ? test.page : await context.newPage();

  await page.goto("https://example.com");
  await expect(page).toHaveTitle("Example Domain");

  if (!test) {
    await context.close();
  }
};
test("Example test", async ({ page }) => {
  await runTest({ page });
});

export default runTest;
