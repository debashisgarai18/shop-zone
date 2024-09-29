const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    const headToken = req.headers.authorization;
    const token  = headToken.split(" ")[1]
    console.log(token)
}   

module.exports = adminAuth