const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema(
  { test: { type: String } },
  { collection: "test" }
);

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;
