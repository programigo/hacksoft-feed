import { type Request, type Response } from "express";
import Feedback from "../models/Feedback.ts";

export async function getFeedbacks(req: Request, res: Response) {
    try {
        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 }); // descending
        res.status(200).json(feedbacks);
    } catch (error: any) {
        console.error("An error occured while getting feedbacks", error);
        res.status(500).json({ message: error.toString() });
    }
}

export async function createFeedback(req: Request, res: Response) {
    try {
        if (!req.user) {
            return res.status(400).json({ message: "You need to be logged in to create a feedback" });
        }

        const { text } = req.body;
        const userId = req.user.id;

        const feedback = await Feedback.create({
            userId,
            text,
        });

        res.status(201).json(feedback);
    } catch (error: any) {
        console.error("An error occured while creating feedback", error)
        res.status(500).json({ message: error.toString() })
    }
}

export async function updateFeedback(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ message: "You need to be logged in to update a feedback" });
        }

        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Check if the current user is the one that created the feedback
        if (feedback.userId.toString() !== user.id) {
            return res.status(401).json({ message: "You do not have permissions to update that feedback" });
        }

        const { text } = req.body;

        // Update feedback
        feedback.text = text;
        await feedback.save();

        res.status(200).json({
            message: "Feedback updated successfully",
            feedback,
        });
    } catch (error: any) {
        console.error("An error occured while updating feedback", error)
        res.status(500).json({ message: error.toString() })
    }
}

export async function deleteFeedback(req: Request, res: Response) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ message: "You need to be logged in to delete a feedback" });
        }

        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Check if the current user is the one that created the feedback
        if (feedback.userId.toString() !== user.id) {
            return res.status(401).json({ message: "You do not have permissions to delete that feedback" });
        }

        // Delete feedback
        const feedbackId = feedback._id.toString();
        await Feedback.findByIdAndDelete(feedbackId);

        res.status(200).json({
            message: "Feedback deleted successfully",
            id: feedbackId,
        });
    } catch (error: any) {
        console.error("An error occured while deleting feedback", error)
        res.status(500).json({ message: error.toString() })
    }
}