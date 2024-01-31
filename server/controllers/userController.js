const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Token = require("../models/tokenModel");  // Add this line for importing Token model
const bcrypt = require("bcryptjs");
const { generateToken, hashToken } = require("../utils");
var parser = require('ua-parser-js');
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);



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
  const { email, password } = req.body

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

// Send verification email

const sendVerificationEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified");
  }

  // Delete token if it exists
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create verification token and save
  const verificationToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(verificationToken);

  //Hash token and save  
  const hashedToken = hashToken(verificationToken);
  await new Token({
    userId: user._id,
    verificationToken: hashedToken,
    createdAt: Date.now(),
    expiredAt: Date.now() + 3600 *60 //1hr

  }).save();

  //Construct Verification URL
  const verificationUrl = `${process.env.FRONTEND_URL}/verify/${verificationToken}`

  //Send  Verification email

  const subject = "Verify Your Account - PrimeLodge"
  const send_to = user.email
  const sent_from = process.env.EMAIL_USER
  const reply_to = "noreply@primelodge.com"
  const template = "verifyEmail"
  const name = user.name
  const link = verificationUrl

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "Email not sent, please try again" });
  }


});

//Verify User
const verifyUser = asyncHandler(async (req, res) => {
  const { verificationToken } = req.params

  const hashedToken = hashToken(verificationToken)

  const userToken = await Token.findOne({
    verificationToken: hashedToken,
    expiredAt: { $gt: Date.now() }
  })

  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expires Token ");

  }

  //Find USer
  const user = await User.findOne({ _id: userToken.userId })

  if (user.isVerified) {
    res.status(400);
    throw new Error("User is already Verified ");

  }

  //Now Verify User
  user.isVerified = true;
  await user.save();


  res.status(200).json({
     message: "Account Verification Successful" })

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

//Send Automated Email
const sendAutomatedEmail = asyncHandler(async (req, res) => {
  const { subject,
    send_to,
    reply_to,
    template, url } = req.body;

  if (!subject || !send_to || !reply_to || !template
  ) {
    res.status(500);
    throw new Error("Missing Email Parameter");

  }


  //Get User
  const user = await User.findOne({ email: send_to });
  if (!user) {
    res.status(404);

    throw new Error("User Not found");
  }
  const sent_from = process.env.EMAIL_USER;
  const name = user.name;
  const link = `${process.env.FRONTEND_URL}${url}`;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Verification Email Sent" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "Email not sent, please try again" });
  }

});

//Forgot password
const forgotPassword = asyncHandler (async(req,res)=>{
  
  const {email} =req.body;
  const user = await User.findOne({email});

  if (!user) {
    res.status(404);
    throw new Error("No User with this email");
  }
  // Delete token if it exists
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create verification token and save
  const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  //Hash token and save  
  const hashedToken = hashToken(resetToken);
  await new Token({
    userId: user._id,
    resetToken: hashedToken,
    createdAt: Date.now(),
    expiredAt: Date.now() + 3600 *60 //1hr

  }).save();

  //Construct Reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`

  //Send  Verification email

  const subject = "Password Reset Request - PrimeLodge";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;
  const reply_to = "noreply@primelodge.com";
  const template = "forgotPassword";
  const name = user.name;
  const link = resetUrl;

  try {
    await sendEmail(
      subject,
      send_to,
      sent_from,
      reply_to,
      template,
      name,
      link
    );
    res.status(200).json({ message: "Password Reset Email Sent" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: "Email not sent, please try again" });
  }


}); 

//Reset password
// Reset password
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    // Hash the reset token


    // Find user token
    const userToken = await Token.findOne({
      resetToken: hashedToken,
      expiredAt: { $gt: Date.now() }
    });

    if (!userToken) {
      res.status(404).json({ message: "Invalid or expired token" });
      return;
    }

    // Find user
    const user = await User.findOne({ _id: userToken.userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Reset password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful, please login" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

})

//Change Password
const changePassword = asyncHandler (async(req,res)=>{
  const {oldPassword, password} = req.body
  const user = await User.findById(req.user._id)

  if(!user){

    res.status(404);
    throw new Error("User not found");
  }

  if (!oldPassword || !password){
    res,status(400);
    throw new error ("Please enter old and new password");
  }
//Check if Old password is correct
const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

//Save new Password
if (user && passwordIsCorrect){
  user.password = password
  await user.save();

  res.status(200).json({message :"Password change Successfully, please re-login!"});
  }else{
    res.status(400).json({message :"Old password is incorrect!"});
  }
}


)


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser, 
  loginStatus,
  sendAutomatedEmail,
  sendVerificationEmail,
  verifyUser,
  forgotPassword,
  resetPassword,
  changePassword

};