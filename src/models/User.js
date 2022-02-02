const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: [true, "Correo electronico requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Contraseña requerida"],
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("user", UserSchema);
