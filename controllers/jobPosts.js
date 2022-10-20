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
        about: req.body.about,
        accessibility: req.body.accessibility,
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

// =======
// Get All
// =======
const jobPostsGetAll = async (req, res) => {
  try {
    const jobPosts = await JobPosts.find();
    res.json(jobPosts);
  } catch (err) {
    console.log("GET /api/jobposts/get/all", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when getting all job posts",
    });
  }
};

// ============
// Get Filtered
// ============
const jobPostsGetFiltered = async (req, res) => {
  try {
    const jobPosts = await JobPosts.find(req.body);
    res.json(jobPosts);
  } catch (err) {
    console.log("POST /api/jobposts/get/filtered", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when getting the filtered job posts",
    });
  }
};

// Export
module.exports = {
  jobPostsCreate,
  jobPostsUpdate,
  jobPostsDelete,
  jobPostsGetAll,
  jobPostsGetFiltered,
};
