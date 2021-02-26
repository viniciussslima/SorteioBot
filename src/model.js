const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Sorteio",
  new mongoose.Schema({
    name: String,
    participants: Array,
  })
);
