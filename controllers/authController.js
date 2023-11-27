async function register(req, res) {
  res.json(req.body);
}

async function login(req, res) {
  res.send("login");
}

module.exports = {
  register,
  login,
};
