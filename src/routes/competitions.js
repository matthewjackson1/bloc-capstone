const express = require("express");
const router = express.Router();

const competitionController = require("../controllers/competitionController");

router.get("/competitions", competitionController.index);

module.exports = router;