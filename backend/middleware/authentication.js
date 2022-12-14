// this file is to authenticate user if eligible other resources can accessed by them otherwise not
const jwt = require("jsonwebtoken");
const status_codes = require('http-status-codes').StatusCodes;
const reason_phrases = require('http-status-codes').ReasonPhrases;

const authenticate = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        req.user=decode
        next()
    }catch(err){
        if (err.name == "TokenExpiredError") {
            res.json({
                message:"token has benn expired"
            })
        }
        else{
            res.status(status_codes.UNAUTHORIZED).json({
                message:reason_phrases.UNAUTHORIZED
            })
        }
    }
}


module.exports = authenticate