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
    console.log(req.body);

    let jobPosts = [];

    // If no body was sent
    if (Object.keys(req.body).length === 0) {
      jobPosts = await JobPosts.find();
    } else {
      // If abilityDiff, customerFacing, Support are not clicked at all, set them to just be empty objects. Otherwise, set to the filter syntax
      let abilityDiffFilter = {};
      let supportFilter = {};
      let customerFacingFilter = {};

      if (req.body.abilityDiff.length > 0) {
        abilityDiffFilter = {
          "jobPost.accessibility.abilityDiff": {
            $all: req.body.abilityDiff,
          },
        };
      }

      if (req.body.support.length > 0) {
        supportFilter = {
          "jobPost.accessibility.support": {
            $all: req.body.support,
          },
        };
      }

      if (req.body.customerFacing !== undefined) {
        customerFacingFilter = {
          "jobPost.about.customerFacing": req.body.customerFacing,
        };
      }

      // The Filter function
      jobPosts = await JobPosts.find({
        $and: [
          abilityDiffFilter,
          customerFacingFilter,
          supportFilter,
          {
            "jobPost.accessibility.environment.noise": {
              $gte: req.body.environment.minNoise,
            },
          },
          {
            "jobPost.accessibility.environment.noise": {
              $lte: req.body.environment.maxNoise,
            },
          },
          {
            "jobPost.accessibility.environment.light": {
              $gte: req.body.environment.minLight,
            },
          },
          {
            "jobPost.accessibility.environment.light": {
              $lte: req.body.environment.maxLight,
            },
          },
        ],
      });
    }

    // Return
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
