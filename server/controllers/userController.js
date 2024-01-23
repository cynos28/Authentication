const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
var parser = require('ua-parser-js');
const jwt = require("jsonwebtoken");


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
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // 1 day
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({
    message: "Successfully logged out"
  });
});

// Get User
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const userData = {
        _id: user._id,
        userName: user.name,  // Rename 'name' to avoid conflict
        userEmail: user.email, // Rename 'email' to avoid conflict
        userPhone: user.phone,
        userBio: user.bio,
        userPhoto: user.photo,
        userRole: user.role,
        isVerified: user.isVerified
      };

      res.status(200).json(userData);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
};

// Update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Destructure user properties
    const { name, email, phone, bio, photo, role, isVerified } = user;

    // Update user properties based on request body
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;
    user.photo = req.body.photo || photo;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
      photo: updatedUser.photo,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Get Login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token; // Use req.cookies.token to access the token from cookies

  if (!token) {
    return res.json(false);
  }

  // Verify Token
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
      return res.json(true);
    }
  } catch (error) {
    // Handle token verification error
    console.error(error);
  }

  return res.json(false);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  loginStatus


};