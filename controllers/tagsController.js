const prisma = require("../library/PrismaClient");
const slugify = require("slugify");
const validation = require("../exceptions/ValidationError");

const { validationResult } = require("express-validator");

async function getAllTags() {
  const tags = await prisma.tag.findMany();
  return tags;
}

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

  let existingTags = await prisma.tag.findMany({
    where: {
      slug: {
        startsWith: slug,
      },
    },
  });

  const nextSlugCount = existingTags.length;

  if (nextSlugCount > 0) {
    slug = `${slug}-${nextSlugCount}`;
  }

  let postsConnection = {};
  if (addData.posts && Array.isArray(addData.posts)) {
    postsConnection = {
      connect: addData.posts.map((post) => ({ id: post })),
    };
  }

  const newTag = await prisma.tag.create({
    data: {
      name: addData.name,
      slug: slug,
      ...postsConnection,
    },
  });

  return res.json(newTag);
}

module.exports = {
  store,
  getAllTags,
};
