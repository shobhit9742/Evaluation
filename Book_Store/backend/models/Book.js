const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        review: String,
        rating: Number,
      },
    ],
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Book", bookSchema);
