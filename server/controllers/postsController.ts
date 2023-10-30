import { Post } from "../models";
import asyncHand from "express-async-handler";

const postsController = (() => {
  const posts_get_all = asyncHand(async (req, res) => {
    const allPosts = await Post.find().populate("author").exec();

    console.log(allPosts);

    // If there are no posts in db, it will return an empty array
    res.json(allPosts);
  });

  const posts_get_one = asyncHand(async (req, res) => {
    const onePost = await Post.findById(req.params.id)
      .populate(["author", "comments"])
      .exec();
    res.json(onePost);
  });

  const posts_new = asyncHand(async (req, res) => {
    const newPost = new Post({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
    });

    const saved = await newPost.save();
    res.status(201).json(saved);
  });

  const posts_put = asyncHand(async (req, res) => {
    // For the find to work,the id must be at least 10+ characters long
    const post = await Post.findById(req.params.id);
    if (post === null) {
      // Resource not found
      res.status(404).json({
        err: "Resource not found",
      });
      return;
    }
    post.content = req.body.content;
    post.updatedAt = new Date();

    const saved = await post.save({ timestamps: true });
    res.status(202).json(saved);
  });

  const posts_delete = asyncHand(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post === null) {
      // Resource not found
      res.status(404).json({
        err: "Resource not found",
      });
      return;
    }

    res.status(200).end();
  });

  return {
    posts_get_all,
    posts_get_one,
    posts_new,
    posts_put,
    posts_delete,
  };
})();

export default postsController;
