const express = require("express");
const { deleteUser, getUser } = require("../controllers/user.controller.js");
const { verifyToken } = require("../middleware/jwt.js");
const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
module.exports = router;
