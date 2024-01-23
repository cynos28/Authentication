const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Authorization denied. Please login.");
    }

    // Verify Token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Get user id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.role === "suspended") {
      res.status(400);
      throw new Error("User suspended. Please contact support.");
    }

    req.user = user;
    next();
    
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { protect };
