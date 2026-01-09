// backend/routes/products.js
const express = require("express");
const router = express.Router();

// TEMP: sample products so frontend can work immediately
router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Product One", price: 10 },
    { id: 2, name: "Product Two", price: 20 }
  ]);
});

module.exports = router;

