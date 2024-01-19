const mongoose = require('mongoose');

const userSchema = mongoose.Schema(

    {
        name: {
            type: String,
            require: [true, "please add your name"]
        },

        email: {
            type: string,
            require: [true, "Please add your email"],
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email",
            ],




        },
        password: {

            type: string,
            require: [true, "Please add your password"]
        },
        photo: {

            type: string,


        },
        phone: {
            type: Number,
        },

        bio: {
            type: string,
            default: "bio",
            require: [true],

        },
        role: {
            type: string,
            default: "Subscriber",
            require: [true],

        },
        isVerified: {

            type: Boolean,
            default: false,

        },
        userAgent: {
            type: Array,
            require: true,
            default: [],


        }
    },

    {

        timestamps: true,
        minimize: false
    }
)

const User = mongoose.model("User", userSchema);
module.exports = User;