import express from "express";

const app = express();
app.use(express.json());

const PORT = 9000;

app.get("/", (req, res) => {
  res.send("This is shop");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server OK http://localhost:${PORT}`);
});
