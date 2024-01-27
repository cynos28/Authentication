const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
};

//Hash token

const hashToken = (token) => {
    return crypto.SHA256(token.toString()).toString(crypto.enc.Hex);
  };

module.exports ={
    generateToken,
    hashToken
}