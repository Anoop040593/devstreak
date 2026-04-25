const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/health", (req, res) => {
  res.send("Server is running!");
});

app.get("/api/message", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Received Response",
    time: Date.now(),
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
