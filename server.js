// Require
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");

// Define Variables
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect DB
connectDB(process.env.MONGODB_URI);

// Test Route
app.get("/", (req, res) => res.json("Test Route is Working"));

// Test Employers
const Employers = require("./models/Employers");
app.put("/employers", async (req, res) => {
  try {
    await Employers.deleteMany({});
    await Employers.create(req.body);
    res.json({
      status: "okay",
      message: "test object is created in the database",
    });
  } catch (err) {
    console.log("PUT /employers", err);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
});

// Test JobPosts
const JobPosts = require("./models/JobPosts");
app.put("/jobposts", async (req, res) => {
  try {
    await JobPosts.deleteMany({});
    await JobPosts.create(req.body);
    res.json({
      status: "okay",
      message: "test object is created in the database",
    });
  } catch (err) {
    console.log("PUT /jobposts", err);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
});

// Listen
app.listen(PORT);
