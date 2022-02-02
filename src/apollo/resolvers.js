const { GraphQLUpload } = require("graphql-upload");
const { register, login } = require("../resolvers/auth");
const {
  getProducts,
  addProduct,
  singleUpload,
  editProduct,
  deleteProduct,
  getCategories,
} = require("../resolvers/product");

const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    register,
    login,
    addProduct,
    singleUpload,
    editProduct,
    deleteProduct,
  },
  Query: {
    getProducts,
    getCategories,
  },
};

module.exports = resolvers;
