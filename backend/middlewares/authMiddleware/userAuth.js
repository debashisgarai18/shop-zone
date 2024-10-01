const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const userAuth = (req, res, next) => {
  const headToken = req.headers.authorization;
  const token = headToken.split(" ")[1];
  const decode = jwt.verify(token, JWT_SECRET);
  if (decode) {
    req.userId = decode.id;
    next();
  } else {
    res.status(404).json({
      message: "There is some issue in User Authentication",
    });
    return;
  }
};

module.exports = userAuth;
