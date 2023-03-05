import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Cors from "micro-cors";
import typeDefs from "./schemas/schemas";
import resolvers from "./resolvers/resolvers";

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });
mongoose.set("debug", true);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  origin: "http://localhost:3000/api/graphql",
  allowHeaders: ["access-control-allow-origin"],
});

const startServer = server.start();

export default cors(async function handler(req, res) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
