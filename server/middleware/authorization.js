const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    // console.log(jwtToken);

    if (!jwtToken) {
      return res.status(403).json("You are not authorized");
    }
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    // console.log("payload");
    // console.log(payload.user);
    // payload.user
    // payload.user = user_id

    req.user = payload.user;
    next();
  } catch (err) {
    // console.error(err.message);
    return res.status(403).json("You are not authorized");
  }
};
