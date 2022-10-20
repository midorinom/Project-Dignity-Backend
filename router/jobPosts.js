// Require
const express = require("express");
const router = express.Router();
const {
  jobPostsCreate,
  jobPostsUpdate,
  jobPostsDelete,
  jobPostsGetAll,
  jobPostsGetFiltered,
} = require("../controllers/jobPosts");

// Endpoints
router.put("/create", jobPostsCreate);
router.patch("/update", jobPostsUpdate);
router.delete("/delete", jobPostsDelete);
router.get("/get/all", jobPostsGetAll);
router.post("/get/filtered", jobPostsGetFiltered);

// Export
module.exports = router;
