// Require
const express = require("express");
const router = express.Router();
const { jobSeekersPost } = require("../controllers/jobSeekers");

// Endpoints
router.post("/post", jobSeekersPost);
router.patch("/create", jobSeekersPost);

// Export
module.exports = router;
