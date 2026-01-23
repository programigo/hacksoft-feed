import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            required: [true, "The 'text' field is required"],
            minlength: [30, "The post text must be at least 30 characters long"],
        },
        likes: {
            type: Number,
            default: 0,
        },
        likedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
    },
    { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;