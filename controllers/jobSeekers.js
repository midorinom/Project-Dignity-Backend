const JobSeekers = require("../models/JobSeekers");

// ====
// Post
// ====
const jobSeekersPost = async (req, res) => {
  try {
    const profileData = await JobSeekers.find({ _id: req.body.id });
    res.json(profileData);
  } catch (err) {
    console.log("POST /api/jobseekers/post", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when getting the jobSeeker profile data",
    });
  }
};

// ======
// Create
// ======
const jobSeekersCreate = async (req, res) => {
  try {
    await JobSeekers.create(req.body);
  } catch (err) {
    console.log("PATCH /api/jobseekers/create", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when creating a new jobSeeker profile",
    });
  }
};

module.exports = { jobSeekersPost, jobSeekersCreate };
