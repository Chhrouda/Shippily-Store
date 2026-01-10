
// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

/* ----------------------- MIDDLEWARES ------------------------ */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* ----------------------- HEALTH ----------------------------- */
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/", (req, res) => {
  res.send("Backend is running. Try /api/health");
});

/* ----------------------- ROUTES ----------------------------- */
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));

/* ----------------------- MONGODB ---------------------------- */
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shippily";

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err =>
    console.error("❌ MongoDB connection error:", err.message)
  );

/* ----------------------- ERRORS ----------------------------- */
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Server error" });
});

/* ----------------------- LISTEN ----------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// ================== FRONTEND SCRIPT.JS ==================
// ================= CONFIG =================
// 🔁 CHANGE THIS when deploying to Render
const API_BASE = "https://shippily-store.onrender.com";
// Example for production:
// const API_BASE = "https://shippily-store.onrender.com";