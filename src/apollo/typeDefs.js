const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Token {
    token: String
  }

  type Product {
    id: ID!
    name: String
    state: Boolean
    price: Float
    category: String
    description: String
    available: Boolean
    img: String
  }

  type File {
    url: String!
  }

  type Categorie {
    id: ID!
    name: String
  }

  input RegisterInput {
    username: String
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ProductInput {
    name: String!
    price: Float!
    category: String!
    description: String
    img: String
  }

  input EditProductInput {
    name: String
    price: Int
    category: String!
    description: String
    img: String
    available: Boolean
  }
  scalar Upload
  type Mutation {
    register(input: RegisterInput): Token
    login(input: LoginInput): Token
    addProduct(input: ProductInput): String
    singleUpload(file: Upload!): File!
    editProduct(id: ID!, input: EditProductInput): String
    deleteProduct(id: ID!): String
  }

  type Query {
    getProducts: [Product]
    getCategories: [Categorie]
  }
`;

module.exports = typeDefs;
