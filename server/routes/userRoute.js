const express = require('express');
const router = express.Router();
const { registerUser ,loginUser} = require("../controllers/userController");

router.post("/register", registerUser);
router.get("/login",loginUser);
router.get("/logout", logoutUser); 


module.exports = router; 