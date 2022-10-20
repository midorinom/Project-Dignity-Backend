// Require
const mongoose = require("mongoose");

// Schema
const EmployersSchema = new mongoose.Schema(
  {
    username: String,
    hash: String,
    company: String,
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
