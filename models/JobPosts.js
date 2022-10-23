// Require
const mongoose = require("mongoose");

// ====================================
// Nested Schemas inside JobPostsSchema
// ====================================
// "About The Job" Tab
const aboutSchema = new mongoose.Schema({
  company: String,
  title: String,
  type: String,
  customerFacing: Boolean,
  desc: String,
  tasks: [String],
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

const supportElabSchema = new mongoose.Schema({
  structured: String,
  shadowing: String,
  redesign: String,
  assistive: String,
  social: String,
  trial: String,
  others: { type: String, default: null }, // optional
});

const environmentSchema = new mongoose.Schema({
  noise: Number,
  light: Number,
  images: [String], // The image urls
  otherInfo: { type: String, default: null }, // optional
});

// "Accessibility Considerations" tab
const accessibilitySchema = new mongoose.Schema({
  abilityDiff: [String],
  support: [String],
  supportElab: supportElabSchema,
  environment: environmentSchema,
});

// ========================================
// The Schema that will be exported
// ========================================
const JobPostsSchema = new mongoose.Schema(
  {
    employerId: String,
    jobPost: {
      about: aboutSchema,
      accessibility: accessibilitySchema,
    },
  },
  { collection: "jobPosts" }
);

// Export
const JobPosts = mongoose.model("JobPosts", JobPostsSchema);
module.exports = JobPosts;
