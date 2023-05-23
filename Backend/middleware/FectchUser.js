var jwt = require("jsonwebtoken");
const key=require("../routes/auth")


const fetchUser = (req, res, next) => {
    const token=req.header("auth-token")
    const verifyToken=jwt.verify(token, "02192000");
    console.log(verifyToken)
    if(!verifyToken)
    return req.status(401).json({"Error":"Empty token"})
    try {
        req.user=verifyToken.user;
        next()
    } catch (error) {
        res.status(401).send("Invalid Token")
        
    }
};
module.exports=fetchUser;
