const mongoose = require("mongoose");

const image = new mongoose.Schema({
  creator: { type: String, required: false },
  image: { type: String, required: true },
  ok: { type: Boolean, required: true },
});

module.exports = mongoose.model("Image", image);
