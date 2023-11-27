const NotFound = require("../exceptions/notFound");

module.exports = function (req, res, next) {
  next(new NotFound("Route requested not found!"));
};
