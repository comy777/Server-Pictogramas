const bcryptjs = require("bcryptjs");
const { generateToken } = require("../jwt/jwt");
const User = require("../models/User");

const register = async (_, { input }) => {
  const { email, password } = input;
  const userValid = await User.findOne({ email });
  if (userValid) throw new Error("Usuario ya se encuentra registrado");
  const user = new User(input);
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();
  const token = generateToken(user);
  return {
    token,
  };
};

const login = async (_, { input }) => {
  const { email, password } = input;
  const user = await User.findOne({ email });
  if (!user) throw new Error("Usuario no se encuentra registrado");
  const passwordValid = await bcryptjs.compare(password, user.password);
  if (!passwordValid) throw new Error("Correo y contraseña no coinciden");
  const token = generateToken(user);
  return {
    token,
  };
};

module.exports = {
  register,
  login,
};
