import { type Request, type Response } from "express";
import Post from "../models/Post.js";

export async function getPosts(req: Request, res: Response) {
    try {
        // Read query oarameters
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;

        // Calculate skip
        const skip = (page - 1) * limit;

        // Get posts in chunks
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Post.countDocuments();

        const userId = req.user?.id;

        const response = posts.map((post) => ({
            _id: post._id,
            userId: post.userId,
            text: post.text,
            likes: post.likes,
            createdAt: post.createdAt,
            hasLiked: userId
                ? post.likedBy.some(
                    (id: any) => id.toString() === userId
                )
                : false,
        }));

        res.status(200).json({ posts: response, total });
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
        res.status(500).json({ message: error.toString() });
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
        console.error("An error occured while updating post", error);
        res.status(500).json({ message: error.toString() });
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
        console.error("An error occured while deleting post", error);
        res.status(500).json({ message: error.toString() });
    }
}

export async function likePost(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ message: "You need to be logged in to like a post" });
        }

        const userId = user.id;

        // Atomic update - ensures the user ID is not already present,
        // and prevents against rapid clicks and concurrent requests
        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: req.params.id,
                likedBy: { $ne: userId } // prevent duplicate likes
            },
            {
                $inc: { likes: 1 },
                $addToSet: { likedBy: userId },
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "You already liked this post or post is not found" });
        }

        res.status(200).json({
            message: "Post liked successfully",
            likes: updatedPost.likes,
        });
    } catch (error: any) {
        console.error("An error occured while trying to like a post", error);
        res.status(500).json({ message: error.toString() });
    }
}

export async function unlikePost(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ message: "You need to be logged in to unlike a post" });
        }

        const userId = user.id;

        const updatedPost = await Post.findOneAndUpdate(
            {
                _id: req.params.id,
                likedBy: userId,
            },
            {
                $inc: { likes: -1 },
                $pull: { likedBy: userId },
            },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "You haven't liked this post or post is not found" });
        }

        res.status(200).json({
            message: "Post unliked successfully",
            likes: updatedPost.likes,
        });
    } catch (error: any) {
        console.error("An error occured while trying to unlike a post", error);
        res.status(500).json({ message: error.toString() });
    }
}