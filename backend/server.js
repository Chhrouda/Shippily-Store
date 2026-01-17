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

// __dirname support
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================
// MIDDLEWARE
// =====================
app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);

app.use(express.json());
app.use(morgan("dev"));

// =====================
// FRONTEND (STATIC)
// =====================
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// =====================
// SEO FILES (HIGHEST PRIORITY)
// =====================
app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(
`User-agent: *
Disallow:

Sitemap: https://shippily-store.onrender.com/sitemap.xml`
  );
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.sendFile(path.join(frontendPath, "sitemap.xml"));
});

// Favicon fix (stops 404 noise)
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(frontendPath, "favicon.ico"));
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

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// =====================
// FRONTEND ROUTING (BOT SAFE)
// =====================
app.get(/^\/(?!api).*/, (req, res) => {
  const ua = req.headers["user-agent"] || "";

  const isBot =
    ua.includes("Googlebot") ||
    ua.includes("bingbot") ||
    ua.includes("Slurp") ||
    ua.includes("DuckDuckBot");

  // Bots see real homepage
  if (req.path === "/" && isBot) {
    return res.sendFile(path.join(frontendPath, "index.html"));
  }

  // Humans see language selector
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





