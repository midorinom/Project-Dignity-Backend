// Require
const express = require("express");
const router = express.Router();
const {
  jobPostsCreate,
  jobPostsUpdate,
  jobPostsDelete,
  jobPostsGet,
} = require("../controllers/jobPosts");

// Endpoints
router.put("/create", jobPostsCreate);
router.patch("/update", jobPostsUpdate);
router.delete("/delete", jobPostsDelete);
router.post("/get", jobPostsGet);

// Export
module.exports = router;
