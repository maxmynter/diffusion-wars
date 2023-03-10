const mongoose = require("mongoose");

const image = new mongoose.Schema(
  {
    creator: { type: String, required: false },
    base64ImageString: { type: String, required: true },
    battlesWon: { type: Number },
    battlesLost: { type: Number },
    ok: { type: Boolean, required: true },
  },
  {
    toJSON: {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        returnedObject.creator = returnedObject.creator
          ? returnedObject.creator
          : "Anonymos";
        delete returnedObject._id;
        delete returnedObject.__v;
      },
    },
  }
);

module.exports = mongoose.models.Image || mongoose.model("Image", image);
