const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"]
    },
    email: {
        type: String,
        required: [true, "Please add your email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add your password"]
    },
    photo: {
        type: String,
    },
    phone: {
        type: Number,
    },
    bio: {
        type: String,
        default: "bio",
        required: [true, "Please add your bio"],
    },
    role: {
        type: String,
        default: "Subscriber",
        required: [true, "Please add user role"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    userAgent: {
        type: Array,
        required: true,
        default: [],
    }
}, {
    timestamps: true,
    minimize: false
});

//Encrypt password before the saving
userSchema.pre("save",async function (next){
    if (!this.isModified("password")){
        return next();
    }

    //Hash password
    const salt =await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})


const User = mongoose.model("User", userSchema);
module.exports = User;
