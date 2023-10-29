import { Request, Response } from "express";
import { Post } from "../models";

const postsController = (() => {
  const posts_get_all = async (req: Request, res: Response) => {
    const allPosts = await Post.find().populate("author").exec();
    return res.json(allPosts);
  };

  const posts_get_one = async (req: Request, res: Response) => {
    const onePost = await Post.findById(req.params.id)
      .populate(["author", "comments"])
      .exec();
    return res.json(onePost);
  };

  const posts_new = async (req: Request, res: Response) => {
    const newPost = new Post({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
    });

    const saved = await newPost.save();

    return res.status(201).json(saved);
  };

  const posts_put = async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    if (post === null) {
      // Resource not found
      return res.status(404).json({
        err: "Resource not found",
      });
    }

    post.content = req.body.content;
    post.updatedAt = new Date();

    const saved = await post.save({ timestamps: true });
    return res.status(202).json(saved);
  };

  const posts_delete = async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id);
    if (post === null) {
      // Resource not found
      return res.status(404).json({
        err: "Resource not found",
      });
    }

    return res.status(200).end();
  };

  return {
    posts_get_all,
    posts_get_one,
    posts_new,
    posts_put,
    posts_delete,
  };
})();

export default postsController;
