import express, { Router } from "express";
import {
    createPost,
    deletePost,
    getPosts,
    updatePost
} from "../controllers/postsController.ts";
import protect from "../middleware/auth.ts";

const router: Router = express.Router();

router.get("/", getPosts);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;