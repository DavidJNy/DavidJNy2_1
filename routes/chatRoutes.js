const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/:chatroomId/messages", chatController.messages);

module.exports = router;
