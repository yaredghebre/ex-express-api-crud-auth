module.exports = {
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "This email is invalid!",
    },
    notEmpty: {
      options: {},
      errorMessage: "Email is required!",
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      options: {},
      errorMessage: "Password is required!",
    },
  },
};
