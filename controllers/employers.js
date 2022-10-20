// Require
const Employers = require("../models/Employers");

// ===
// Get
// ===
const employersGet = async (req, res) => {
  try {
    const profileData = await Employers.find({ _id: req.body.id }).select(
      "-username -hash"
    ); // use .select to exclude username and hash from being sent over to the front-end
    res.json(profileData);
  } catch (err) {
    console.log("POST /api/employers/get", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when getting the employer profile data",
    });
  }
};

// ======
// Update
// ======
const employersUpdate = async (req, res) => {
  try {
    await Employers.updateOne(
      { _id: req.body.id },
      {
        company: req.body.company,
        whoWeAre: req.body.whoWeAre,
        whatWeDo: req.body.whatWeDo,
        experience: req.body.experience,
        location: req.body.location,
        accessibility: req.body.accessibility,
        contact: req.body.contact,
        email: req.body.email,
      }
    );
    res.json({
      status: "okay",
      message: "employer profile is updated",
    });
  } catch (err) {
    console.log("PATCH /api/employers/update", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when updating employer profile",
    });
  }
};

// Export
module.exports = { employersGet, employersUpdate };
