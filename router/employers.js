// Require
const express = require("express");
const router = express.Router();
const { employersGet, employersUpdate } = require("../controllers/employers");

// Endpoints
router.post("/get", employersGet);
router.patch("/update", employersUpdate);

// Export
module.exports = router;
