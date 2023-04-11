const express = require("express");

const { verifyToken } = require("../middleware/jwt");
const {
  createOrder,
  getOrders,
} = require("../controllers/order.controller.js");
const router = express.Router();

// router.get("/",verifyToken,getOrders);
router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
module.exports = router;
