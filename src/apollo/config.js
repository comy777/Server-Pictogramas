const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const { validToken } = require("../jwt/jwt");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers["authorization"] || "";
      const user = validToken(token);
      return { user };
    },
  });
  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: 4000 }, r));
  // await server.listen().then(({ url }) => {
  //   console.log(`🚀 Server ready at ${url}`);
  // });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

module.exports = startServer;
