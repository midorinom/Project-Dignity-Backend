// Require
const express = require("express");
const router = express.Router();
const { usersCreate, usersLogin } = require("../controllers/users");

// Endpoints
router.put("/create", usersCreate);
router.post("/login", usersLogin);

// Export
module.exports = router;
