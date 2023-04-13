const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/message.controller.js");
const { verifyToken } = require("../middleware/jwt.js");
const router = express.Router();

router.get("/:id", verifyToken, getMessages);
router.post("/", verifyToken, createMessage);
module.exports = router;
