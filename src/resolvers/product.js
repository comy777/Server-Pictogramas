const { uploadImages } = require("../helpers/upload");
const Category = require("../models/Category");
const Product = require("../models/Product");

const getProducts = async () => {
  const query = { state: true };
  const products = await Product.find(query);
  return products;
};

const addProduct = async (_, { input }, ctx) => {
  const { user } = ctx;
  if (!user) throw new Error("Se requiere token");
  const { name } = input;
  // const productValid = await Product.findOne({ name: name.toUpperCase() });
  // if (productValid) throw new Error("Producto ya registrado");
  const data = {
    ...input,
    name: input.name.toUpperCase(),
    user: user.id,
  };
  const product = new Product(data);
  await product.save();
  return "Producto guardado";
};

const singleUpload = async (_, { file }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const resp = await uploadImages({
    createReadStream,
    filename,
    mimetype,
    encoding,
  });
  return { url: filename };
};

const editProduct = async (_, { id, input }, ctx) => {
  if (!ctx.user) throw new Error("Token requerido");
  let product = await Product.findById(id);
  if (!product) throw new Error("El producto no existe");
  const { ...data } = input;
  if (input.name) {
    data.name = input.name.toUpperCase();
  }
  data.user = ctx.user.id;
  await Product.findByIdAndUpdate(id, data, { new: true });
  return "Actualizado";
};

const deleteProduct = async (_, { id }, ctx) => {
  const { user } = ctx;
  if (!user) throw new Error("Token requerido");
  const product = await Product.findById(id);
  if (!product) throw new Error("El producto no existe");
  if (product.user.toString() !== user.id)
    throw new Error("No tine permiso para eliminar este producto");
  await Product.findByIdAndUpdate(id, { state: false }, { new: true });
  return "Eliminado";
};

const getCategories = async () => {
  const categories = await Category.find();
  return categories;
};

module.exports = {
  getProducts,
  addProduct,
  singleUpload,
  editProduct,
  deleteProduct,
  getCategories,
};
