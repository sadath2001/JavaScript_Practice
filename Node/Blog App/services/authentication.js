const JWT = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;
const expires_in = process.env.JWT_EXPIRES_IN;

function createToken(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret, { expiresIn: expires_in });
  return token;
}

function verifyToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}
module.exports = {
  createToken,
  verifyToken,
};
