import mongoose, { Schema } from "mongoose";

interface Post {}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", postSchema);

export default Post;
