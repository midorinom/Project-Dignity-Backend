const mongoose = require("mongoose");

// ====================================
// Nested Schemas inside JobPostsSchema
// ====================================
// "About The Job" Tab
const aboutSchema = new mongoose.Schema({
  title: String,
  type: String,
  customerFacing: Boolean,
  desc: String,
  tasks: String,
  skills: [String],
  minSalary: String,
  maxSalary: String,
  locationSame: Boolean,
  postalCode: String,
  block: String,
  unit: String,
  accessibility: String,
});

// Nested Schemas inside accessibilitySchema
const abilityDiffSchema = new mongoose.Schema({
  physical: Boolean,
  visual: Boolean,
  hearing: Boolean,
  intellectual: Boolean,
  autism: Boolean,
});

const supportSchema = new mongoose.Schema({
  structured: Boolean,
  structuredElab: String,
  shadowing: Boolean,
  shadowingElab: String,
  redesign: Boolean,
  redesignElab: String,
  assistive: Boolean,
  assistiveElab: String,
  social: Boolean,
  socialElab: String,
  trial: Boolean,
  trialElab: String,
  others: { type: String, default: null }, // optional
});

const environmentSchema = new mongoose.Schema({
  noise: String,
  light: String,
  images: [String], // The image urls
  otherInfo: { type: String, default: null }, // optional
});

// "Accessibility Considerations" tab
const accessibilitySchema = new mongoose.Schema({
  abilityDiff: abilityDiffSchema,
  support: supportSchema,
  environment: environmentSchema,
});

// ========================================
// The Schema that will be exported
// ========================================
const JobPostsSchema = new mongoose.Schema(
  {
    employerId: String,
    about: aboutSchema,
    accessibility: accessibilitySchema,
  },
  { collection: "jobPosts" }
);

// Export
const JobPosts = mongoose.model("JobPosts", JobPostsSchema);
module.exports = JobPosts;
