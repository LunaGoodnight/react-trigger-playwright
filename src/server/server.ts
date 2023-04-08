import express from "express";
import { test, chromium, firefox, webkit } from "@playwright/test";

const app = express();
const port = 3000;

app.use(express.json());

test.beforeEach(async ({ browserType, context }, testInfo) => {
  const { url, browser } = testInfo.config.playwright;

  const browserInstance = await browserType.launch();
  const page = await browserInstance.newPage();
  await page.goto(url);

  testInfo.browser = browserInstance;
  testInfo.page = page;
});

test.afterEach(async ({ browser }, testInfo) => {
  await browser.close();
});

app.post("/run-test", async (req, res) => {
  const { url, browserType } = req.body;

  const result = await test.runWithPlaywright({
    timeout: 60000,
    playwright: {
      url,
      browser: await getBrowserType(browserType),
    },
  });

  if (result.failed) {
    res.status(500).send("An error occurred during the test");
  } else {
    res.status(200).send("Test completed successfully");
  }
});

async function getBrowserType(browserType) {
  switch (browserType) {
    case "firefox":
      return firefox;
    case "webkit":
      return webkit;
    default:
      return chromium;
  }
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
