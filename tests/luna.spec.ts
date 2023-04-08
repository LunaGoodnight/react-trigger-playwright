import { test, expect } from "@playwright/test";

test("should display message on page", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.click("text=Fetch message");
  const message = await page.textContent("p");
  expect(message).toBe("Hello, world!");
});
