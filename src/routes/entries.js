const express = require("express");
const router = express.Router();

 //#1
const entryController = require("../controllers/entryController");
const validation = require("./validation");

 // #2
router.post("/competitions/:competitionId/entries/create",
  validation.validateEntries,
  entryController.create);

module.exports = router;