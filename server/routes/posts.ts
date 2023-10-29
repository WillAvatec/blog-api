import express from "express";
import { postController } from "../controllers";

const router = express.Router();

// Return all the posts
router.get("/", postController.posts_get_all);

// Return one specific post
router.get("/:id", postController.posts_get_one);

// Push new post to database
router.post("/", postController.posts_new);

// Update one Post
router.put("/:id", postController.posts_put);

// Erase one specific post from database
router.delete("/:id", postController.posts_delete);

export default router;
