const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, '1233', { expiresIn: "1d" });
};

module.exports = { generateToken };
