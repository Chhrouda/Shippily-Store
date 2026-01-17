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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ======================
   MIDDLEWARE
====================== */
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

/* ======================
   FRONTEND
====================== */
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

/* ======================
   DATABASE
====================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

/* ======================
   API
====================== */
app.get("/api/health", (_, res) => {
  res.status(200).json({ status: "OK" });
});

/* ======================
   SEO – CRITICAL FIX
====================== */

// ✅ Serve sitemap with correct headers
app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.sendFile(path.join(frontendPath, "sitemap.xml"));
});

// ✅ Serve robots.txt explicitly
app.get("/robots.txt", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.sendFile(path.join(frontendPath, "robots.txt"));
});

/* ======================
   FRONTEND ROUTING (ONLY ONCE)
====================== */
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ======================
   START SERVER
====================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});






