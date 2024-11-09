const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
const admin = require("firebase-admin");
const serviceAccount = require("../../firebase-secret-key/shopzone-deba018-firebase-adminsdk-t6v0j-56555f8497.json");

// initialize the admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

const userAuth = async (req, res, next) => {
  const headToken = req.headers.authorization;
  if (!headToken) {
    return res.status(404).json({
      message: "Auth header not found",
    });
  }
  // get the token
  const token = headToken.split(" ")[1];
  if (!token) {
    return res.status(404).json({
      message: "The token is not found",
    });
  }
  try {
    // here check for the google firebase auth, provided the idToken
    const decodeFBToken = await admin.auth().verifyIdToken(token);
    req.user = decodeFBToken.email;
    console.log(decodeFBToken);
    next();
  } catch (firebaseErr) {
    // if the jwt for firebaseAuth isnot found then we need to proceed with the normal jwt token
    const decode = jwt.verify(token, JWT_SECRET);
    try {
      if (decode) {
        req.user = decode.username;
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
  }
};

module.exports = userAuth;
