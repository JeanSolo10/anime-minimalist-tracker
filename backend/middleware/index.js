const admin = require("../config/firebase-config");

const decodeToken = async (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res.status(400).json({ message: "No bearer token found!" });
  }
  const token = req.headers.authorization;
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      /* check user making request */
      req.user = decodeValue;
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = decodeToken;
