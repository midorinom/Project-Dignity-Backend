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
    await JobSeekers.updateOne(
      { _id: req.body.id },
      {
        about: req.body.about,
        skills: req.body.skills,
        abilityDifferences: req.body.abilityDifferences,
        experience: req.body.experience,
        education: req.body.education,
      }
    );
    res.json({
      status: "okay",
      message: "a new job seeker profile is created",
    });
  } catch (err) {
    console.log("PATCH /api/jobseekers/create", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when creating a new jobSeeker profile",
    });
  }
};

module.exports = { jobSeekersPost, jobSeekersCreate };
