const admin = require("../firebase");
const User = require("../models/user");

// middlewares validation
exports.authCheck = async (req, res, next) => {
  console.log(req.headers.authtoken); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE USER IN AUTCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async () => {};
