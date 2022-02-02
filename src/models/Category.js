const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, state, ...category } = this.toObject();
  return category;
};

module.exports = model("categories", CategoriaSchema);
