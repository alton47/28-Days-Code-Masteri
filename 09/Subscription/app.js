import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Mambooooo!!");
});

app.listen(port, () => {
  console.log("Mambo kengeeeee");
});

export default app;
