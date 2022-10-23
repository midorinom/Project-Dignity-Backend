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

// =================================
// Get (Includes Search and Filters)
// =================================
const jobPostsGet = async (req, res) => {
  try {
    // This array will be sent as the response
    let jobPosts = [];

    // -------
    // Get All
    // -------
    if (Object.keys(req.body).length === 0) {
      jobPosts = await JobPosts.find();
    } else {
      // ------
      // Search
      // ------
      // This will be used in the .find, alongside the filters
      let search = [];
      const arrayOfSearchInputs = req.body.search.split(" "); // split by space

      for (searchInput of arrayOfSearchInputs) {
        const regex = new RegExp(searchInput, "i"); // the "i" option means case insensitive
        search.push({
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

      // -------
      // Filters
      // -------
      // Empty objects by default. Only set to the filter syntax if the respective filters are selected as all (exist in req.body).
      let abilityDiffFilter = {};
      let supportFilter = {};
      let customerFacingFilter = {};
      let environmentFilter = [];

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

      environmentFilter = [
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
      ];

      // This will be used in the .find, alongside search
      const filters = [
        abilityDiffFilter,
        supportFilter,
        customerFacingFilter,
        ...environmentFilter,
      ];

      jobPosts = await JobPosts.find({
        $and: [...search, ...filters],
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

// Export
module.exports = {
  jobPostsCreate,
  jobPostsUpdate,
  jobPostsDelete,
  jobPostsGet,
};
