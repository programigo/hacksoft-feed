import express, { Router } from "express";
import {
    createFeedback,
    deleteFeedback,
    getFeedbacks,
    updateFeedback
} from "../controllers/feedbackController.ts";

const router: Router = express.Router();

router.get("/", getFeedbacks);
router.post("/", createFeedback);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

export default router;