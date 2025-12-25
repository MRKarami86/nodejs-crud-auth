const jwt = require('jsonwebtoken');

exports.createToken = (userId)=>{
    return jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: '1h'
    });
};