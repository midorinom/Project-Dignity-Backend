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

// ==========================================================
// Get (Includes Initial Filter, Search, Filters and Sorting)
// ==========================================================
const jobPostsGet = async (req, res) => {
  try {
    console.log("Initial Filter", req.body.initialFilter);
    // This array will be sent as the response
    let jobPosts = [];

    // --------------
    // Initial Filter
    // --------------
    let initialFilter = {};

    if (
      Object.keys(req.body.initialFilter).some(
        (element) => element === "abilityDiff"
      )
    ) {
      initialFilter = {
        "jobPost.accessibility.abilityDiff": {
          $in: [req.body.initialFilter.abilityDiff],
        },
      };
    } else if (
      Object.keys(req.body.initialFilter).some(
        (element) => element === "support"
      )
    ) {
      initialFilter = {
        "jobPost.accessibility.support": {
          $in: [req.body.initialFilter.support],
        },
      };
    }

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
      $and: [initialFilter, ...search, ...filters],
    });

    // ------------------------
    // Sorting Recommended Jobs
    // ------------------------
    // The sorting only runs if the user is a Job Seeker
    if (Object.keys(req.body).some((element) => element === "profile")) {
      // Weightage given to each section. The total is 1 (100%).
      const abilityDiffWeightage = 0.4;
      const supportWeightage = 0.4;
      const skillsWeightage = 0.2;

      // Loop through each job post
      for (const jobPost of jobPosts) {
        // Initialise Variables
        let abilityDiffScore = 0;
        let supportScore = 0;
        let skillsScore = 0;

        for (const abilityDiff of req.body.profile.abilityDifferences.diff) {
          if (
            jobPost.jobPost.accessibility.abilityDiff.some(
              (element) => element === abilityDiff
            )
          ) {
            abilityDiffScore +=
              (1 / req.body.profile.abilityDifferences.diff.length) * 100;
          }
        }

        for (const support of req.body.profile.abilityDifferences.support) {
          if (
            jobPost.jobPost.accessibility.support.some(
              (element) => element === support
            )
          ) {
            supportScore +=
              (1 / req.body.profile.abilityDifferences.support.length) * 100;
          }
        }

        for (const skill of req.body.profile.skills) {
          if (
            jobPost.jobPost.about.skills.some(
              (element) => element === skill.skill
            )
          ) {
            skillsScore += (1 / req.body.profile.skills.length) * 100;
          }
        }

        // Sum up and apply the respective weightage
        console.log("AbilityDiff Score", abilityDiffScore);
        console.log("Support Score", supportScore);
        console.log("Skills Score", skillsScore);

        let score = 0;
        score =
          abilityDiffScore * abilityDiffWeightage +
          supportScore * supportWeightage +
          skillsScore * skillsWeightage;

        // Attach the score to a key-value pair in the jobPost
        jobPost.score = score;
        console.log("Total Score", score);
      }

      // After looping through the jobposts, sort by descending order
      jobPosts.sort((a, b) => {
        if (a.score > b.score) {
          return -1;
        } else if (a.score < b.score) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    // ======
    // Return
    // ======
    res.json(jobPosts);
  } catch (err) {
    console.log("POST /api/jobposts/get", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when getting the job posts",
    });
  }
};

// ==================
// Get By Employer Id
// ==================
const jobPostsGetEmployerId = async (req, res) => {
  try {
    const jobPosts = await JobPosts.find({ employerId: req.body.employerId });
    res.json(jobPosts);
  } catch (err) {
    console.log("POST /api/jobposts/get/employer-id", err);
    res.status(400).json({
      status: "error",
      message:
        "an error has occurred when getting the job posts made by the employer",
    });
  }
};

// Export
module.exports = {
  jobPostsCreate,
  jobPostsUpdate,
  jobPostsDelete,
  jobPostsGet,
  jobPostsGetEmployerId,
};
