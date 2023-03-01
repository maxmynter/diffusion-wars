import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Image {
    id: ID
    creator: String
    base64ImageString: String
    battlesWon: Int
    battlesLost: Int
    ok: Boolean
  }

  type Query {
    getAllImages: [Image]
    getTwoDifferentRandomImages: [Image]
    getImage(imageId: String!): Image
  }

  type Mutation {
    addImage(imageString: String!, artist: String): Image
    battleWon(imageId: String): Image
    battleLost(imageId: String): Image
  }
`;

export default typeDefs;
