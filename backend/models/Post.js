import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  username: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  username: String,
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
});

const Post = mongoose.model("Post", postSchema);
export default Post;
