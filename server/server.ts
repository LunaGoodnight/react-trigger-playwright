import express, { Request, Response } from "express";
import runTest from "../tests/playwright.spec";

const app = express();
const port = 3002;

app.get("/api/test", (req, res) => {
  res.send("Hello from server!");
});

app.get("/api/runtests", async (req: Request, res: Response) => {
  try {
    await runTest();
    res.json({ message: "ok" });
  } catch (error) {
    console.error(`Error running tests: ${error}`);
    res.status(500).send(`Error running tests: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
