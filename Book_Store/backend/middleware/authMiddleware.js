const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    res.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);
      next();
    } catch (err) {
      res.status(401).send(`Not Authorized, tokeFailed`);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req, user.roles)) {
      res.status(403).send("User Role not Authorized");
    }
  };
};
