const prisma = require("../library/PrismaClient");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { matchedData } = require("express-validator");
const { json } = require("express");

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

/////////////////////////

async function login(req, res) {
  res.send("login");
}

module.exports = {
  register,
  login,
};
