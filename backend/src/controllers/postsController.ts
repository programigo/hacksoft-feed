import { type Request, type Response } from "express";
import Post from "../models/Post.ts";

export async function getPosts(req: Request, res: Response) {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 }); // descending
        res.status(200).json(posts);
    } catch (error: any) {
        console.error("An error occured while getting postss", error);
        res.status(500).json({ message: error.toString() });
    }
}

export async function createPost(req: Request, res: Response) {
    try {
        if (!req.user) {
            return res.status(400).json({ message: "You need to be logged in to create a post" });
        }

        const { text } = req.body;
        const userId = req.user.id;

        const post = await Post.create({
            userId,
            text,
        });

        res.status(201).json(post);
    } catch (error: any) {
        console.error("An error occured while creating post", error)
        res.status(500).json({ message: error.toString() })
    }
}

export async function updatePost(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ message: "You need to be logged in to update a post" });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the current user is the one that created the post
        if (post.userId.toString() !== user.id) {
            return res.status(401).json({ message: "You do not have permissions to update that post" });
        }

        const { text } = req.body;

        // Update post
        post.text = text;
        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post,
        });
    } catch (error: any) {
        console.error("An error occured while updating post", error)
        res.status(500).json({ message: error.toString() })
    }
}

export async function deletePost(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ message: "You need to be logged in to delete a post" });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the current user is the one that created the post
        if (post.userId.toString() !== user.id) {
            return res.status(401).json({ message: "You do not have permissions to delete that post" });
        }

        // Delete post
        const postId = post._id.toString();
        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            message: "Post deleted successfully",
            id: postId,
        });
    } catch (error: any) {
        console.error("An error occured while deleting post", error)
        res.status(500).json({ message: error.toString() })
    }
}