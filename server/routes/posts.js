import express from "express";
import {deleteComment, getFeedPosts , getPostById, getTopicPosts, getUserPosts , likePost, postComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// read
router.get("/" , verifyToken , getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:category" , verifyToken , getTopicPosts);
router.get("/:id" , verifyToken , getPostById);

// update
router.patch("/:id/like" , verifyToken , likePost);
router.patch("/:postId/:userId/comment/delete" , verifyToken , deleteComment)
// POST
router.post("/:postId/:userId/comment" , verifyToken, postComment);

export default router;