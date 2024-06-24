const express = require("express");
const router = express.Router();
const jokeController = require("../controllers/jokeController");

router.get("/", jokeController.getAllJokes);
router.get("/random", jokeController.getRandomJoke);
router.post("/", jokeController.addJoke);
router.delete("/:id", jokeController.deleteJoke);

module.exports = router;
