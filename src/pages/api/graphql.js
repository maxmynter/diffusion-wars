import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import micro_cors from "micro-cors";
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

const cors = micro_cors({
  origin: "*",
  allowCredentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: [
    "access-control-allow-credentials",
    "access-control-allow-origin",
    "authorization",
    "content-type",
  ],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await server.createHandler({
    path: "/api/graphql",
    cors: {
      origin: true,
      credentials: true,
    },
  })(req, res);
});
