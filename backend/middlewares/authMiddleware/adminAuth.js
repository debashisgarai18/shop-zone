const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  const headToken = req.headers.authorization;
  const token = headToken.split(" ")[1];
  if (decode) next();
  else {
    res.status(404).json({
      message: "There is some issue in User Authentication",
    });
    return;
  }
};

module.exports = adminAuth;
