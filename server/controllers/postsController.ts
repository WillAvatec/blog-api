import { Post } from "../models";
import asyncHand from "express-async-handler";
import template from "../utils/jsonTemplate";
import { body, validationResult } from "express-validator";

const postsController = (() => {
  const posts_get_all = asyncHand(async (req, res) => {
    const allPosts = await Post.find().populate("author").exec();

    console.log(allPosts);

    // If there are no posts in db, it will return an empty array
    res.json(template({ data: allPosts }));
  });

  const posts_get_one = asyncHand(async (req, res) => {
    const onePost = await Post.findById(req.params.id)
      .populate("author", "username")
      .populate("comments")
      .exec();

    if (onePost === null) {
      res.status(404).json(
        template({
          status: "error",
          message: "Post not found, it probably doesn't exists",
        })
      );
      return;
    }
    res.json(
      template({
        data: onePost,
      })
    );
  });

  const posts_new = [
    body("title", "Title field must not be empty").trim().isLength({ min: 1 }),
    body("content", "Post has no content").trim().isLength({ min: 1 }),
    asyncHand(async (req, res) => {
      // Check for errors
      const errors = validationResult(req).formatWith(
        (err) => err.msg as string
      );
      if (!errors.isEmpty()) {
        res.status(400).json(
          template({
            status: "error",
            data: req.body,
            message: errors.array(),
          })
        );
        return;
      }
      const newPost = new Post({
        author: req.body.author, // TODO: req.user._id -- The author must be the logged user
        title: req.body.title,
        content: req.body.content,
      });

      const saved = await newPost.save();
      res.status(201).json(
        template({
          data: saved,
        })
      );
    }),
  ];

  const posts_put = asyncHand(async (req, res) => {
    // For the find to work,the id must be at least 10+ characters long
    const post = await Post.findById(req.params.id);
    if (post === null) {
      // Resource not found
      res.status(404).json(
        template({
          status: "error",
          message: "Resource not found",
        })
      );
      return;
    }
    post.content = req.body.content;
    post.updatedAt = new Date();

    const saved = await post.save({ timestamps: true });
    res.status(202).json(
      template({
        data: saved,
      })
    );
  });

  const posts_delete = asyncHand(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post === null) {
      // Resource not found
      res.status(404).json(
        template({
          status: "error",
          message: "Resource not found",
        })
      );
      return;
    }

    res.status(200).json(
      template({
        message: "Post deleted successfully, comments are lost now",
      })
    );
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
