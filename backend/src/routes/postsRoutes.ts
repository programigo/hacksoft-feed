import express, { Router } from "express";
import {
    createPost,
    deletePost,
    getPosts,
    likePost,
    unlikePost,
    updatePost
} from "../controllers/postsController.js";
import protect from "../middleware/auth.js";
import optionalAuth from "../middleware/optionalAuth.js";

const router: Router = express.Router();

router.get("/", optionalAuth, getPosts);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);
router.post("/:id/like", protect, likePost);
router.post("/:id/unlike", protect, unlikePost);

export default router;