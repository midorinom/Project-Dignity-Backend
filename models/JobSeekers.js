const mongoose = require("mongoose");

const JobSeekersSchema = new mongoose.Schema({}, { collection: "jobSeekers" });

const JobSeekers = mongoose.model("JobSeekers", JobSeekersSchema);

module.exports = JobSeekers;
