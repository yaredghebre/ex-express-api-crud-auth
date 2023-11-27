const jsonwebtoken = require("jsonwebtoken");
const usersAuthError = require("../exceptions/usersAuthError");

module.exports = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    throw new usersAuthError("Token missing!");
  }

  const token = bearer.split(" ")[1];

  const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);

  req["user"] = user;

  next();
};
