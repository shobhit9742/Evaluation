const { user, route } = require("../models");
const asyncHandler = require("express-async-handler");

exports.getOrderByCustomer = asyncHandler(async (req, res) => {
  const userID = req.params.userId;
  const orders = await orders.findAll({
    where: { userID },
    include: [{ model: Book }],
  });
  res.json(orders);
});
