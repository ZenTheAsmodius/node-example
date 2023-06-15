const jwt = require('jsonwebtoken');
const { JWT_CIPHER, JWT_DURATION } = require('../../config');


function jwtSign(claims) {
  return jwt.sign(claims, JWT_CIPHER, {
    expiresIn: JWT_DURATION
  });
}

function jwtVerify(token) {
  return jwt.verify(token, JWT_CIPHER);
}

module.exports = {
  jwtSign,
  jwtVerify
}