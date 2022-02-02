const jwt = require("jsonwebtoken");

const generateToken = ({ id, email, username }) => {
  const payload = { id, username, email };
  try {
    return jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
  } catch (error) {
    console.log(error);
  }
};

const validToken = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = {
  generateToken,
  validToken,
};
