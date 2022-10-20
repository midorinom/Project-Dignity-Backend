// Require
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const users = require("./router/users");
const jobSeekers = require("./router/jobSeekers");
const employers = require("./router/employers");

// Define Variables
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect DB
connectDB(process.env.MONGODB_URI);

// Routes
app.use("/api/users", users);
app.use("/api/jobseekers", jobSeekers);
app.use("/api/employers", employers);

// Listen
app.listen(PORT);
