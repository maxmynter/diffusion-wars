import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import typeDefs from "./schemas/uploadImage";
import resolvers from "./resolvers/uploadImage";

const server = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const startServer = server.start();

export default cors(async (req, res) => {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
