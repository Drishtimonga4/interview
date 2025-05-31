import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// Create a new post
router.post("/create", async (req, res) => {
  const { title, content, username } = req.body;
  try {
    const post = new Post({ title, content, username });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Add comment to a post
router.post("/:id/comment", async (req, res) => {
  const { content, username } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ content, username });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

export default router;
