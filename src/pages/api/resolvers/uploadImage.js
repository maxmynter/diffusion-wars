const Image = require("../models/images");

const resolvers = {
  Query: {
    getAllImages: async () => {
      const allImages = await Image.find({});
      return JSON.stringify(allImages);
    },
  },
  Mutation: {
    addImage: (root, args) => {
      if (args) {
        const image = new Image({
          base64ImageString: args.imageString,
          ok: true,
        });
        return image.save();
      }
      return { ok: false };
    },
  },
};

export default resolvers;
