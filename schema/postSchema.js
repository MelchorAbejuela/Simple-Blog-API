const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  post: {
    type: String,
    required: [true, "post cannot be empty"],
  },
  audience: {
    type: String,
    default: "friends",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
