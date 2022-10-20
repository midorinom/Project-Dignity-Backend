// Require
const express = require("express");
const router = express.Router();
const {
  jobSeekersPost,
  jobSeekersCreate,
} = require("../controllers/jobSeekers");

// Endpoints
router.post("/post", jobSeekersPost);
router.patch("/create", jobSeekersCreate);

// Export
module.exports = router;
