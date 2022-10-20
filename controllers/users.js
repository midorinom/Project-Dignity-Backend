// Require
const JobSeekers = require("../models/JobSeekers");
const Employers = require("../models/Employers");

// ======
// Create
// ======
const usersCreate = async (req, res) => {
  try {
    const createdUser = {
      username: req.body.username,
      hash: req.body.password, // Need to change this to bcrypt
    };

    if (req.body.type === "jobSeeker") {
      await JobSeekers.create(createdUser);
      res.json({
        status: "okay",
        message: "jobSeeker user is created",
      });
    } else if (req.body.type === "employer") {
      await Employers.create(createdUser);
      res.json({
        status: "okay",
        message: "employer user is created",
      });
    } else {
      throw new Error("invalid user type");
    }
  } catch (err) {
    console.log("PUT /api/users/create", err);
    res.status(400).json({
      status: "error",
      message: `an error has occurred when creating a new user`,
    });
  }
};

module.exports = { usersCreate };
