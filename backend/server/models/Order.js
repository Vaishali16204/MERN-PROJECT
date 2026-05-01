const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    totalQty: {
      type: Number,
      required: true,
    },
    user: {
      email: String,
      name: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
    paymentMethod: String,
    paymentId: String,
    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
  {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },}
);

module.exports = mongoose.model("Order", orderSchema);

