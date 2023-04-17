const express = require("express");

const { verifyToken } = require("../middleware/jwt");
const {
  getOrders,
  intent,
  confirm,
} = require("../controllers/order.controller.js");
const router = express.Router();

router.post("/create-payment-intent/:id", verifyToken, intent);
router.get("/", verifyToken, getOrders);
router.put("/", verifyToken, confirm);
module.exports = router;
