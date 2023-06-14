const jwt = require('jsonwebtoken');
const { JWT_CYPHER, JWT_DURATION } = require('../../config');


async function jwtSign(claims) {
  return await jwt.sign(claims, JWT_CYPHER, {
    expiresIn: JWT_DURATION
  }).promise();
}

async function jwtVerify(token) {
  return await jwt.verify(token, jwt_cypher).promise();
}

module.exports = {
  jwtSign,
  jwtVerify
}