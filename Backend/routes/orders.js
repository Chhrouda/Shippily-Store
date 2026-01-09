
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Create order
router.post("/", async (req, res) => {
  try {
    const { items, total } = req.body;

    const order = new Order({ items, total });
    await order.save();

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

// Optional: list orders (for testing)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

module.exports = router;

