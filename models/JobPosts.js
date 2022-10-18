const mongoose = require("mongoose");

const JobPostsSchema = new mongoose.Schema({}, { collection: "jobposts" });

const JobPosts = mongoose.model("JobPosts", JobPostsSchema);

module.exports = JobPosts;
