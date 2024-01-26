const mongoose = require('mongoose');


const tokenSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true, 
        ref: "User"
    },
    
    verficationToken: {
        type: String,
        default:""
    },

    resetToken: {
        type: String,
        default:""
    },

    loginToken: {
        type: String,
        default:""
    },
    createdAt: {
        type: Date,
        required: true,
        
    },
    expiredAt: {
        type: Date,
        required: true
    },

});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;
