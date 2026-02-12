import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Mambooooo!!");
});

app.listen(PORT, () => {
  console.log("Mambo kengeeeee");
});

export default app;
