// Require
const express = require("express");
const router = express.Router();
const {
  jobPostsCreate,
  jobPostsUpdate,
  jobPostsDelete,
  jobPostsGet, jobPostsSearch
} = require("../controllers/jobPosts");

// Endpoints
router.put("/create", jobPostsCreate);
router.patch("/update", jobPostsUpdate);
router.delete("/delete", jobPostsDelete);
router.post("/get", jobPostsGet);
router.post("/search", jobPostsSearch);

// Export
module.exports = router;
