const prisma = require("../library/PrismaClient");
const slugify = require("slugify");
const Validation = require("../exceptions/ValidationError");

// Cotnrollo la validazione
const { validationResult } = require("express-validator");

async function store(req, res, next) {
  const validation = validationResult(req);
  const addData = req.body;
  if (!addData.name) {
    return next(new Validation("Name missing!"));
  }

  let slug = slugify(addData.name, {
    replacement: "-",
    lower: true,
  });

  let existingCategories = await prisma.category.findMany({
    where: {
      slug: {
        startsWith: slug,
      },
    },
  });

  const nextSlugCount = existingCategories.length;

  if (nextSlugCount > 0) {
    slug = `${slug}-${nextSlugCount}`;
  }

  let postsConnection = {};
  if (addData.posts && Array.isArray(addData.posts)) {
    postsConnection = {
      connect: addData.posts.map((post) => ({ id: post })),
    };
  }

  const newCategory = await prisma.category.create({
    data: {
      name: addData.name,
      slug: slug,
      ...postsConnection,
    },
  });

  return res.json(newCategory);
}

module.exports = {
  store,
};
