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
    getImage: async (root, args) => {
      const image = await Image.findById(args.imageId);
      return image;
    },
  },
  Mutation: {
    addImage: (root, args) => {
      if (args) {
        const image = new Image({
          base64ImageString: args.imageString,
          creator: args.artist,
          battleResults: [],
          ok: true,
        });
        return image.save();
      }
      return { ok: false };
    },
    battleWon: (root, args) => {
      return new Promise((resolve, reject) => {
        Image.findOneAndUpdate(
          { _id: args.imageId },
          { $inc: { battlesWon: 1 } },
          { upsert: true, new: true }
        ).exec((err, res) => {
          console.log("test", res);
          if (err) {
            reject(false);
          } else {
            resolve({
              battlesWon: res.battlesWon,
              battlesLost: res.battlesLost,
            });
          }
        });
      });
    },
    battleLost: (root, args) => {
      return new Promise((resolve, reject) => {
        Image.findOneAndUpdate(
          { _id: args.imageId },
          { $inc: { battlesLost: 1 } },
          { upsert: true, new: true }
        ).exec((err, res) => {
          console.log("test", err, res);
          if (err) {
            reject(false);
          } else {
            resolve({
              battlesWon: res.battlesWon,
              battlesLost: res.battlesLost,
            });
          }
        });
      });
    },
  },
};

export default resolvers;
