const prisma = require("../library/PrismaClient");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { matchedData } = require("express-validator");
const usersAuthError = require("../exceptions/usersAuthError");

/////////// R E G I S T E R /////////////
async function register(req, res) {
  const sanitizedData = matchedData(req);

  sanitizedData.password = await bcrypt.hash(sanitizedData.password, 10);

  const user = await prisma.user.create({
    data: {
      ...sanitizedData,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ user, token });
}

/////////// L O G I N /////////////
async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return next(new usersAuthError("User not found!"));
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return next(new usersAuthError("Wrong Password!"));
  }

  const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // cancello la password dall'oggetto user!!!
  delete user.password;
  res.json({ login, token });
}

module.exports = {
  register,
  login,
};
