import express from "express";

const router = express.Router();

// Return all the posts
router.get("/");

// Return one specific post
router.get("/:id");

// Push new post to database
router.post("/");

// Update one Post
router.put("/:id");

// Erase one specific post from database
router.delete("/:id");

export default router;
