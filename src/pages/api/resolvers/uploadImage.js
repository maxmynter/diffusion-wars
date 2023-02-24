const Image = require("../models/images");

const resolvers = {
  Query: {
    getImage: () => {
      return "getImage";
    },
  },
  Mutation: {
    addImage: (root, args) => {
      if (args) {
        const image = new Image({ image: args.imageString, ok: true });
        return image.save();
      }
      return { ok: false };
    },
  },
};

export default resolvers;
