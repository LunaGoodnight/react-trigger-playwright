import express from "express";
import { test, chromium, firefox, webkit } from "@playwright/test";
import { runTest } from "../../tests/lap.spec";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/run-test", async (req: express.Request, res: express.Response) => {
  try {
    const { url, browserType } = req.body;
    await runTest({ url, browserType });
    res.status(200).json({ message: "Test passed!" });
  } catch (err) {
    res.status(500).json({ message: "Test failed!" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
