import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        price: Number,
        quantity: Number
      }
    ],
    total: Number
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
