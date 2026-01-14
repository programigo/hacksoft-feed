import express, { Router } from "express";
import {
    createFeedback,
    deleteFeedback,
    getFeedbacks,
    updateFeedback
} from "../controllers/feedbackController.ts";
import protect from "../middleware/auth.ts";

const router: Router = express.Router();

router.get("/", getFeedbacks);
router.post("/", protect, createFeedback);
router.put("/:id", protect, updateFeedback);
router.delete("/:id", protect, deleteFeedback);

export default router;