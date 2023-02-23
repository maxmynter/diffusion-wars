const resolvers = {
  Query: {
    getImage: () => {
      console.log("getting Image");
      return "getImage";
    },
  },
};

export default resolvers;
