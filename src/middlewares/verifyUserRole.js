const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env");

const authenticatedUsersRoles = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: "@authenticate/missing-token",
      message: "token is missing",
    });
  }

  const [prefix, token] = authorization.split(" ");

  if (prefix !== "Bearer") {
    return response.status(401).json({
      error: "@authenticate/invalid-token",
      message: "The token provided is not invalid",
    });
  }

  if (!token) {
    return response.status(401).json({
      error: "@authenticate/invalid-token",
      message: "The token provided is not invalid",
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return response.status(401).json({
        error: "@authenticate/invalid-token",
        message: "The token provided is not invalid",
      });
    }

    if (decoded.role !== "admin") {
      return response.status(401).json({
        error: "@authenticate/invalid-token",
        message: "The token provided is not invalid",
      });
    }

    request.user = decoded;

    return next();
  });
};

module.exports = authenticatedUsersRoles;
