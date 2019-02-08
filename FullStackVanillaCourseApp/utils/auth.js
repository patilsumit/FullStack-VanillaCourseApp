var jwt = require('jsonwebtoken');
const password = "secret";

// Generate JWT token
function generateToken(payload, callback) {
    jwt.sign(payload, password, callback);
}

// Verify JWT token
function verifyToken(token, callback) {
    jwt.verify(token, password, callback);
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;