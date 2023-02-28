const Image = require("../models/images");

const getAllImagesFromMongo = async () => {
  const allImages = await Image.find({});
  return allImages.map((image) => image.toJSON());
};

const resolvers = {
  Query: {
    getAllImages: async () => {
      return await getAllImagesFromMongo();
    },
    getTwoDifferentRandomImages: async () => {
      const allImages = await getAllImagesFromMongo();
      let randomNumber1 = null;
      let randomNumber2 = null;
      while (randomNumber1 === randomNumber2 && allImages.length > 1) {
        randomNumber1 = Math.floor(Math.random() * allImages.length);
        randomNumber2 = Math.floor(Math.random() * allImages.length);
      }
      const randomImage1 = allImages[randomNumber1];
      const randomImage2 = allImages[randomNumber2];
      return [randomImage1, randomImage2];
    },
  },
  Mutation: {
    addImage: (root, args) => {
      if (args) {
        const image = new Image({
          base64ImageString: args.imageString,
          artist: args.artist,
          ok: true,
        });
        return image.save();
      }
      return { ok: false };
    },
  },
};

export default resolvers;
