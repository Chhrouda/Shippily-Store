// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// --- Health check ---
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// --- Mount routes BEFORE listen ---
const ordersRoutes = require("./routes/orders");
app.use("/api/orders", ordersRoutes);

const productsRoutes = require("./routes/products");
app.use("/api/products", productsRoutes);

// --- MongoDB connect ---
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shippily";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));

// --- Start server LAST ---
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});


