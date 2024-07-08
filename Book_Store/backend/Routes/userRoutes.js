const express = require("express");
const { getOrderByCustomer } = require("../controllers/UserController");
const { protect, authorize } = require("../middleware/authMiddleware");
const route = express.Router();

route.get(
  "./:userId/orders",
  protect,
  authorize("user", "admin"),
  getOrderByCustomer
);

module.exports = route;
