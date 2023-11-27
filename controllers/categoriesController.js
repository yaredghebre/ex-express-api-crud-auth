const prisma = require("../library/PrismaClient");
// const slugify = require("slugify");

// Cotnrollo la validazione
const { validationResult } = require("express-validator");

async function store(req, res) {
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.status(422).json(validation.array());
  }

  const addData = req.body;

  const newCategory = await prisma.category.create({
    data: {
      name: addData.name,
      slug: addData.slug,
      posts: {
        connect: addData.posts.map((post) => ({ id: post })),
      },
    },
  });

  return res.json(newCategory);
}

module.exports = {
  store,
};
