import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// =====================
// PATH FIX (__dirname)
// =====================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "..", "frontend");

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

// =====================
// DATABASE
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

// =====================
// API ROUTES
// =====================
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// =====================
// STATIC FRONTEND (FIRST)
// =====================
app.use(express.static(frontendPath, {
  extensions: ["html"]
}));

// =====================
// SEO FILES (CRITICAL)
// =====================
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.sendFile(path.join(frontendPath, "robots.txt"));
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.sendFile(path.join(frontendPath, "sitemap.xml"));
});

// =====================
// FRONTEND FALLBACK (HTML ONLY)
// =====================
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// =====================
// START SERVER
// =====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





