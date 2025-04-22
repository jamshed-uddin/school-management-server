const express = require("express");
const { getSchools, addSchool } = require("../controllers/schoolControllers");
const router = express.Router();

router.get("/", getSchools);
router.post("/", addSchool);

module.exports = router;
