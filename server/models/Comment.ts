import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    immutable: true,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Comment = mongoose.model("comment", commentSchema);

export default Comment;
