import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Image {
    id: ID
    creator: String
    image: String
  }

  type Query {
    getImage: String
  }
`;

export default typeDefs;
