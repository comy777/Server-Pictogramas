const { model, Schema } = require("mongoose");

const ProductoSchema = Schema({
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
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  available: {
    type: Boolean,
    default: true,
  },
  img: { type: String },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("products", ProductoSchema);
