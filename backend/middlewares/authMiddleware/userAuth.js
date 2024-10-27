const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

const userAuth = (req, res, next) => {
  const headToken = req.headers.authorization;
  if (!headToken) {
    return res.status(404).json({
      message: "Token not found",
    });
  }
  try {
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
  } catch (err) {
    return res.status(404).json({
      message: `Some error : ${err}`,
    });
  }
};

module.exports = userAuth;
