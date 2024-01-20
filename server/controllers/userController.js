const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");


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
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("Email already in use.");
    }

    //Create new user
    const user = await User.create({
        name,
        email,
        password,
    })

    //GenerateToken
    const token =generateToken(user._id)

    //Send HTTP Only cookie
    res.cookie("token",token,{
        path:"/",
        httpOnly:true,
        expires:new Date(Date.now() + 1000 * 86400),// 1 day
        sameSite :"none",
        secure :true,
    })

    if (user) {
        const {_id,name,email,phone,bio,photo,role,isVerified} = user

        res.status(201).json({
            _id,name,email,phone,bio,photo,role,isVerified,token
        })
     }
      else{
        res.status(400);
        return res.json({ error: "Invalid user data ." });
        }
        
    

});

module.exports = {
    registerUser
};
