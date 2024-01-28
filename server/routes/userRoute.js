const express = require('express');
const router = express.Router();
const { registerUser ,loginUser, logoutUser, getUser, updateUser, loginStatus, sendAutomatedEmail, sendVerificationEmail, verifyUser, forgotPassword, resetPassword, } = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');


router.post("/register", registerUser);
router.post("/login",loginUser);
router.get("/logout", logoutUser); 
router.get("/getUser", protect,getUser); 
router.patch("/updateUser", protect,updateUser); 
router.get("/loginStatus", loginStatus); 
router.post("/sendAutomatedEmail",protect, sendAutomatedEmail); 
router.post("/sendVerificationEmail",protect, sendVerificationEmail); 
router.patch("/verifyUser/:verificationToken", verifyUser); 
router.post("/forgotPassword", forgotPassword); 
router.patch("/resetpassword/:resetToken", resetPassword); 
  
module.exports = router; 