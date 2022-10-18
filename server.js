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

// Test Database
const Employers = require("./models/Employers");
app.put("/test", async (req, res) => {
  try {
    await Employers.create({
      username: req.body.username,
      hash: req.body.hash,
      whoWeAre: req.body.whoWeAre,
      whatWeDo: req.body.whatWeDo,
      experience: req.body.experience,
      location: req.body.location,
      accessibility: req.body.accessibility,
      contactNumber: req.body.contactNumber,
      emailAddress: req.body.emailAddress,
    });
    res.json({
      status: "okay",
      message: "test object is created in the database",
    });
  } catch (err) {
    console.log("PUT /test", err);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
});

// Listen
app.listen(PORT);
