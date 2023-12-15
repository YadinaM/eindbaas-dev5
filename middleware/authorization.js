const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
const authHeader = req.headers.authorization;
const token = authHeader && authHeader.split(" ")[1];

// check if token exists
if (!token) {
    return res.status(401).json({
        status: "error",
        message: "No token, authorization denied",
    });
}

// verify token
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //werkt nu nog niet want geen env
    req.user = decoded.user;
    next();
} catch (error) {
    res.status(401).json({
        status: "error",
        message: "Token is not valid",
    });
}

// if token is valid, check if user is admin
if (!req.user.admin) {
    return res.status(403).json({
        status: "error",
        message: "Forbidden",
    });
}   
};
module.exports = authenticate;