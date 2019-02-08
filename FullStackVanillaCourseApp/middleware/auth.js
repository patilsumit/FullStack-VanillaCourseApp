const { verifyToken } = require('../utils/auth');

// Middleware function to authenticate req using jwt token
function authToken(req, res, next) {
    // Get the token and verify it
    var token = req.headers["authorization"];
    if (token) {
        token = token.split(" ");
        token = token[1];
        // If invalid set appropriate status and return error
        verifyToken(token, function (err, payload) {
            if (err) {
                // send error status
                res.status(401).send("Error: Invalid auth token");
                console.log("Error: Invalid auth token", token);
                return;
            }
            else {
                // store the user in req.user
                req.user = payload;
                next();
            }
        });
    }
    else {
        res.status(400).send("Error: Bad request");
        console.log("Error: No auth token", token);
        return;
    }
}

module.exports = authToken;
