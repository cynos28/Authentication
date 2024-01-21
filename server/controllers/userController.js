const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
var parser = require('ua-parser-js');

//Register User
const registerUser = asyncHandler(async (req, res) => {
  // res.send("Register User");
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    return res.json({ error: "Please fill in the required fields." });
  }

  if (password.length < 6) {
    res.status(400);
    return res.json({ error: "Password must be at least 6 characters." });
  }

  // check user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already in use.");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    userAgent: [parser(req.headers['user-agent']).ua],
  });

  // GenerateToken
  const token = generateToken(user._id);

  // Send HTTP Only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(201).json({
      _id, name, email, phone, bio, photo, role, isVerified, token
    });
  } else {
    res.status(400);
    return res.json({ error: "Invalid user data." });
  }
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400);
    return res.json({ error: "Please add email and password." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    return res.json({ error: "User Not found, please signup." });
  }

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (!passwordIsCorrect) {
    res.status(400);
    return res.json({ error: "Invalid email or password." });
  }
  // Trigger 2FA validation

  // GenerateToken
  const token = generateToken(user._id);

  if (user && passwordIsCorrect) {
    // Send HTTP Only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, phone, bio, photo, role, isVerified } = user;

    res.status(200).json({
      _id, name, email, phone, bio, photo, role, isVerified, token
    });
  } else {
    res.status(500);
    return res.json({ error: "Something went wrong, try again." });
  }
});

//LogOut user
const logoutUser = asyncHandler(async (req,res) => {
  res.send("Logout");
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser
};