const mongoose = require("mongoose");

const EmployersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    hash: {
      type: String,
      required: true,
    },
    whoWeAre: {
      type: String,
    },
    whatWeDo: {
      type: String,
    },
    experience: {
      type: String,
    },
    location: {
      type: String,
    },
    accessibility: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
  },
  { collection: "employers" }
);

const Employers = mongoose.model("Employers", EmployersSchema);

module.exports = Employers;
