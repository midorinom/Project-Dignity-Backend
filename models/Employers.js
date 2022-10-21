// Require
const mongoose = require("mongoose");

const employerProfileSchema = new mongoose.Schema({
  company: String,
  whoWeAre: String,
  whatWeDo: String,
  experience: String,
  location: String,
  accessibility: String,
  contact: String,
  email: String,
});

// Schema
const EmployersSchema = new mongoose.Schema(
  {
    username: String,
    hash: String,
    profile: employerProfileSchema,
  },
  { collection: "employers" }
);

// Export
const Employers = mongoose.model("Employers", EmployersSchema);
module.exports = Employers;
