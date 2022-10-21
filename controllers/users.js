// Require
const JobSeekers = require("../models/JobSeekers");
const Employers = require("../models/Employers");
const bcrypt = require("bcrypt");

// ======
// Create
// ======
const usersCreate = async (req, res) => {
  try {
    // User type is not jobSeeker/employer
    if (req.body.type !== "jobSeeker" && req.body.type !== "employer") {
      return res.status(400).json({
        status: "error",
        message: "invalid user type",
      });
    }

    // Check if there is a duplicate username
    const jobSeekerUser = await JobSeekers.findOne({
      username: req.body.username,
    });
    const employerUser = await Employers.findOne({
      username: req.body.username,
    });
    // Username already exists
    if (jobSeekerUser || employerUser) {
      return res.status(400).json({
        status: "error",
        message: "duplicate username",
      });
    }

    // Hash the password and create the user account
    const hash = await bcrypt.hash(req.body.password, 12); // Increase the number for more security
    const createdUser = {
      username: req.body.username,
      hash: hash,
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
    }
  } catch (err) {
    console.log("PUT /api/users/create", err);
    res.status(400).json({
      status: "error",
      message: "an error has occurred when creating a new user",
    });
  }
};

// =====
// Login
// =====
const usersLogin = async (req, res) => {
  try {
    // Check if user exists
    const jobSeekerUser = await JobSeekers.findOne({
      username: req.body.username,
    });
    const employerUser = await Employers.findOne({
      username: req.body.username,
    });
    // User does not exist
    if (!jobSeekerUser && !employerUser) {
      console.log("user does not exist");
      return res.status(401).json({
        status: "error",
        message: "not authorised",
      });
    }

    // Assign the found user to a variable
    // Also, add the user type to the response

    let user = "";

    let response = {};
    if (jobSeekerUser) {
      user = jobSeekerUser;
      response.type = "jobSeeker";
      response.id = jobSeekerUser._id;
    } else if (employerUser) {
      user = employerUser;
      response.type = "employer";
      response.id = employerUser._id;
    }

    // Check if username and password match
    // note (andre): pending addition of jwt
    const result = await bcrypt.compare(req.body.password, user.hash);

    // No match
    if (!result) {
      console.log("username or password error");
      return res.status(401).json({
        status: "error",
        message: "not authorised",
      });
    }
    // Successful login
    res.json(response); // Return the user's profile and user type to the front-end, username and hash are excluded
  } catch (err) {
    console.log("POST /api/users/login", err);
    res.status(400).json({ status: "error", message: "login failed" });
  }
};

module.exports = { usersCreate, usersLogin };
