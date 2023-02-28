import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Image {
    id: ID
    creator: String
    base64ImageString: String
    ok: Boolean
  }

  type Query {
    getAllImages: [Image]
    getTwoDifferentRandomImages: [Image]
  }

  type Mutation {
    addImage(imageString: String!): Image
  }
`;

export default typeDefs;
