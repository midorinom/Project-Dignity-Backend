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
    const arrayOfSearchInputs = req.body.search.split(" "); // split by space
    const filter = []; // This will be used in the .find as the filter

    for (searchInput of arrayOfSearchInputs) {
      const regex = new RegExp(searchInput, "i"); // the "i" option means case insensitive
      filter.push({
        $or: [
          { "jobPost.about.title": regex },
          { "jobPost.about.company": regex },
          { "jobPost.about.type": regex },
          { "jobPost.about.desc": regex },
          { "jobPost.about.tasks": regex },
          { "jobPost.about.skills": regex },
        ],
      });
    }
    const jobPosts = await JobPosts.find({ $and: [...filter] });
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
