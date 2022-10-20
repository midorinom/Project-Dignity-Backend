// Require
const mongoose = require("mongoose");

// Schema
const EmployersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    hash: String,
    whoWeAre: String,
    whatWeDo: String,
    experience: String,
    location: String,
    accessibility: String,
    contact: String,
    email: String,
  },
  { collection: "employers" }
);

// Export
const Employers = mongoose.model("Employers", EmployersSchema);
module.exports = Employers;
