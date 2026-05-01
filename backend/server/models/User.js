const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  status: {
    type: String,
    default: "Inactive",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  lastActive: {
    type: Date,
    default: null,
  },
});