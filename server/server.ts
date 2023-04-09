import express from "express";

const app = express();
const port = 3002;

app.get("/api/test", (req, res) => {
  res.send("Hello from server!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
