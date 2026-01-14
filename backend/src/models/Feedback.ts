import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            required: [true, "The 'text' field is required"],
            minlength: [30, "The feedback text must be at least 30 characters long"],
        },
        likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;