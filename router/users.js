// Require
const express = require("express");
const router = express.Router();
const { usersCreate } = require("../controllers/users");

// Endpoints
router.put("/create", usersCreate);

// Export
module.exports = router;
