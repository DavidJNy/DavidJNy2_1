const express = require("express");
const router = express.Router();
const vidController = require("../controllers/vidController");

router.post("/", vidController.downloadNewVid);

module.exports = router;