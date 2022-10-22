// Require
const JobPosts = require("../models/JobPosts");

// ======
// Create
// ======
const jobPostsCreate = async (req, res) => {
  try {
    await JobPosts.create(req.body);
    res.json({
      status: "okay",
      message: "job post is created",
    });
  } catch (err) {
    console.log("PUT /api/jobposts/create", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when creating job post",
    });
  }
};

// ======
// Update
// ======
const jobPostsUpdate = async (req, res) => {
  try {
    await JobPosts.updateOne(
      { _id: req.body.id },
      {
        ...req.body,
      }
    );
    res.json({
      status: "okay",
      message: "job post is updated",
    });
  } catch (err) {
    console.log("PATCH /api/jobposts/update", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when updating job post",
    });
  }
};

// ======
// Delete
// ======
const jobPostsDelete = async (req, res) => {
  try {
    await JobPosts.deleteOne({ _id: req.body.id });
    res.json({
      status: "okay",
      message: "job post is deleted",
    });
  } catch (err) {
    console.log("DELETE /api/jobposts/delete", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when deleting job post",
    });
  }
};

// ===
// Get
// ===
const jobPostsGet = async (req, res) => {
  try {
    const jobPosts = await JobPosts.find(req.body);
    res.json(jobPosts);
  } catch (err) {
    console.log("POST /api/jobposts/get", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when getting the job posts",
    });
  }
};

// ======
// Search
// ======
const jobPostsSearch = async (req, res) => {
  try {
    // Currently only filters by whether the search is a substring of the title. Can consider adding more search capabilities
    const jobPosts = await JobPosts.find({
      "jobPost.about.title": new RegExp(req.body.search, "i"), // the "i" option means case insensitive
    });
    res.json(jobPosts);
  } catch (err) {
    console.log("POST /api/jobposts/search", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when getting the searched job posts",
    });
  }
};

// Export
module.exports = {
  jobPostsCreate,
  jobPostsUpdate,
  jobPostsDelete,
  jobPostsGet,
  jobPostsSearch,
};
