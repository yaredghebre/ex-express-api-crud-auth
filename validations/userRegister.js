const prisma = require("../library/PrismaClient");

module.exports = {
  name: {
    in: ["body"],
    notEmpty: {
      options: {},
      errorMessage: "Name is required!",
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: "Name must be at least 2 chars long!",
    },
  },
  email: {
    in: ["body"],
    notEmpty: "Email is required!",
    isEmail: {
      errorMessage: "Invalid email!",
    },
    custom: {
      options: async (value) => {
        const alreadyExists = await prisma.user.findUnique({
          where: {
            email: value,
          },
        });

        if (alreadyExists) {
          return Promise.reject("This email already exists!");
        }

        return true;
      },
    },
  },
  password: {
    in: ["body"],
    isStrongPassword: {
      options: {
        minLength: 6,
        // le seguenti possono non essere incluse quando si usa isStrongPassword
        // minLowercase: 1,
        // minUppercase: 1,
        // minNumbers: 1,
        // minSymbols: 1,
      },
    },
    errorMessage:
      "Password must be of at least 6 digits and contain 1 upper-case letter, 1 number and 1 symbol!",
  },
};
