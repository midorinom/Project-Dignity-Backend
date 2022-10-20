// Require
const express = require("express");
const router = express.Router();
const {
  jobSeekersGet,
  jobSeekersUpdate,
} = require("../controllers/jobSeekers");

// Endpoints
router.post("/get", jobSeekersGet);
router.patch("/update", jobSeekersUpdate);

// Export
module.exports = router;
