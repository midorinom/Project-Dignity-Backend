const mongoose = require("mongoose");

const EmployersSchema = new mongoose.Schema({}, { collection: "employers" });

const Employers = mongoose.model("Employers", EmployersSchema);

module.exports = Employers;
