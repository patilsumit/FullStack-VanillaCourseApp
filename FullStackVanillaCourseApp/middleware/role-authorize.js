// Define the permission table

// Middleware function to authorize base on role
function authorizeRole(req, res, next) {
    const user = req.user;
    // check for permissions
    const method;
    const url;

    // Check for permission

    // If not authorized, send error status

    // else, call next()

}