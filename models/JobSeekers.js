const mongoose = require("mongoose");

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
  issueMonth: { type: String, default: null },
  issueYear: { type: String, default: null },
});

const abilityDifferencesSchema = new mongoose.Schema({
  diff: [String],
  diagnosis: String,
  diffDesc: String,
  support: [String],
  supportDesc: String,
  comm: String,
  //commSpec optional, only input if comm: "others". Default null.
  commSpec: { type: String, default: null },
  aids: String,
  //aidsSpec optional, only input if aids: "others". Default null.
  aidsSpec: { type: String, default: null },
  travel: Boolean,
});

const experienceSchema = new mongoose.Schema({
  title: String,
  type: String,
  company: String,
  startMonth: String,
  startYear: String,
  //endMonth/Year optional, only input if not working
  endMonth: { type: String, default: null },
  endYear: { type: String, default: null },
  jobDesc: String,
});

const educationSchema = new mongoose.Schema({
  school: String,
  cert: String,
  start: String,
  end: String,
  grade: String,
  desc: String,
});

const JobSeekersSchema = new mongoose.Schema(
  {
    username: String,
    hash: String,
    about: aboutSchema,
    skills: [skillsSchema],
    abilityDifferences: abilityDifferencesSchema,
    experience: [experienceSchema],
    education: [educationSchema],
  },
  { collection: "jobSeekers" }
);

const JobSeekers = mongoose.model("JobSeekers", JobSeekersSchema);

module.exports = JobSeekers;
