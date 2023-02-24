import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Image {
    id: ID
    creator: String
    image: String
    ok: Boolean
  }

  type Query {
    getImage: String
  }

  type Mutation {
    addImage(imageString: String!): Image
  }
`;

export default typeDefs;
