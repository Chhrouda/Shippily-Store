import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import paymentRoutes from "./routes/payments.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Needed for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================
// MIDDLEWARE
// =====================
app.use(cors());

// IMPORTANT: allow indexing (Helmet safe config)
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);

app.use(express.json());
app.use(morgan("dev"));

// =====================
// FRONTEND (STATIC FILES)
// =====================
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// =====================
// SEO FILES (CRITICAL)
// =====================
app.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(frontendPath, "robots.txt"));
});

app.get("/sitemap.xml", (req, res) => {
  res.sendFile(path.join(frontendPath, "sitemap.xml"));
});

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
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// =====================
// FRONTEND FALLBACK (PRODUCTION SAFE)
// =====================
app.get(/^\/(?!api).*/, (req, res) => {
  if (req.path === "/") {
    return res.sendFile(path.join(frontendPath, "lang.html"));
  }

  const filePath = path.join(frontendPath, req.path);

  res.sendFile(filePath, err => {
    if (err) {
      res.sendFile(path.join(frontendPath, "index.html"));
    }
  });
});

// =====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



