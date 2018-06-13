const express = require("express");
const router = express.Router();

const competitionController = require("../controllers/competitionController");

router.get("/competitions", competitionController.index);
router.get("/competitions/new", competitionController.new);
router.post("/competitions/create", competitionController.create);
router.get("/competitions/:id", competitionController.show);

module.exports = router;