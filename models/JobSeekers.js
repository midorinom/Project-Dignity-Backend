// Require
const mongoose = require("mongoose");

// Schemas
const aboutSchema = new mongoose.Schema({
  name: String,
  aspiration: String,
  brand: String,
  email: String,
  mobile: String,
});

const skillsSchema = new mongoose.Schema({
  skill: String,
  //cert -> issueYear optional. Default null.
  cert: { type: String, default: null },
  issuer: { type: String, default: null },
  issueDate: { type: String, default: null },
});

const abilityDifferencesSchema = new mongoose.Schema({
  diff: [String],
  diagnosis: String,
  diffDesc: String,
  support: [String],
  supportDesc: String,
  comm: [String],
  //commSpec optional, only input if comm: "others". Default null.
  commSpec: { type: String, default: null },
  aids: [String],
  //aidsSpec optional, only input if aids: "others". Default null.
  aidsSpec: { type: String, default: null },
  travel: Boolean,
});

const experienceSchema = new mongoose.Schema({
  title: String,
  type: String,
  company: String,
  startDate: String,
  //endDate optional, only input if not working
  endDate: { type: String, default: null },
  jobDesc: String,
});

const educationSchema = new mongoose.Schema({
  school: String,
  cert: String,
  startDate: String,
  endDate: String,
  grade: String,
  desc: String,
});

const jobseekerProfileSchema = new mongoose.Schema({
  about: aboutSchema,
  skills: [skillsSchema],
  abilityDifferences: abilityDifferencesSchema,
  experience: [experienceSchema],
  education: [educationSchema],
});

const savedJobsSchema = new mongoose.Schema({
  id: String,
  date: String,
});

const JobSeekersSchema = new mongoose.Schema(
  {
    username: String,
    hash: String,
    profile: jobseekerProfileSchema,
    savedJobs: [savedJobsSchema],
    appliedJobs: [String],
  },
  { collection: "jobSeekers" }
);

// Export
const JobSeekers = mongoose.model("JobSeekers", JobSeekersSchema);
module.exports = JobSeekers;
