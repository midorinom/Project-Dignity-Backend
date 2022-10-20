const JobSeekers = require("../models/JobSeekers");

// ====
// Post
// ====
const jobSeekersGet = async (req, res) => {
  try {
    const profileData = await JobSeekers.find({ _id: req.body.id }).select(
      "-username -hash"
    ); // use .select to exclude username and hash from being sent over to the front-end
    res.json(profileData);
  } catch (err) {
    console.log("POST /api/jobseekers/get", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when getting the jobSeeker profile data",
    });
  }
};

// ======
// Update
// ======
const jobSeekersUpdate = async (req, res) => {
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
      message: "job seeker profile is updated",
    });
  } catch (err) {
    console.log("PATCH /api/jobseekers/update", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when updating jobSeeker profile",
    });
  }
};

// Export
module.exports = { jobSeekersGet, jobSeekersUpdate };
