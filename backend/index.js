const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "https://matrix-industries-assessment.vercel.app",
  }),
);
app.use(express.json());

app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Matrix Industries API running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
