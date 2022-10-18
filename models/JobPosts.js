const mongoose = require("mongoose");

// ============================================
// All the nested Schemas inside JobPostsSchema
// ============================================
// "About The Job" Tab
const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  customerFacing: {
    type: Boolean,
  },
  desc: {
    type: String,
  },
  tasks: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  minSalary: {
    type: Number,
  },
  maxSalary: {
    type: Number,
  },
  locationSame: {
    type: Boolean,
  },
  postalCode: {
    type: Number,
  },
  block: {
    type: String,
  },
  unit: {
    type: String,
  },
  accessibility: {
    type: String,
  },
});

// Nested Schemas inside accessibilitySchema
const abilityDiffSchema = new mongoose.Schema({
  physical: {
    type: Boolean,
  },
  visual: {
    type: Boolean,
  },
  hearing: {
    type: Boolean,
  },
  intellectual: {
    type: Boolean,
  },
  autism: {
    type: Boolean,
  },
});

const supportSchema = new mongoose.Schema({
  structured: {
    type: Boolean,
  },
  structuredElab: {
    type: String,
  },
  shadowing: {
    type: Boolean,
  },
  shadowingElab: {
    type: String,
  },
  redesign: {
    type: Boolean,
  },
  redesignElab: {
    type: String,
  },
  assistive: {
    type: Boolean,
  },
  assistiveElab: {
    type: String,
  },
  social: {
    type: Boolean,
  },
  socialElab: {
    type: String,
  },
  trial: {
    type: Boolean,
  },
  trialElab: {
    type: String,
  },
  others: {
    type: String,
  },
});

const environmentSchema = new mongoose.Schema({
  noise: {
    type: Number,
  },
  light: {
    type: Number,
  },
  images: {
    type: [String], // The image urls
  },
  otherInfo: {
    type: String,
  },
});

// "Accessibility Considerations" tab
const accessibilitySchema = new mongoose.Schema({
  abilityDiff: {
    type: abilityDiffSchema,
  },
  support: {
    type: supportSchema,
  },
  environment: {
    type: environmentSchema,
  },
});

// This is the Schema that will be exported
const JobPostsSchema = new mongoose.Schema(
  {
    about: {
      type: aboutSchema,
    },
    accessibility: {
      type: accessibilitySchema,
    },
  },
  { collection: "jobPosts" }
);

// Export
const JobPosts = mongoose.model("JobPosts", JobPostsSchema);
module.exports = JobPosts;
