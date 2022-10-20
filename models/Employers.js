const mongoose = require("mongoose");

const EmployersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    hash: String,
    whoWeAre: String,
    whatWeDo: String,
    experience: String,
    location: String,
    accessibility: String,
    contactNumber: String,
    emailAddress: String,
  },
  { collection: "employers" }
);

const Employers = mongoose.model("Employers", EmployersSchema);

module.exports = Employers;
