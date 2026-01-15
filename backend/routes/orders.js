
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ➕ Create order
router.post("/", async (req, res) => {
  try {
    const { items, total } = req.body;

    const order = new Order({ items, total });
    await order.save();

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create order"
    });
  }
});

// 📦 List orders (for admin/testing)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
});

export default router;


