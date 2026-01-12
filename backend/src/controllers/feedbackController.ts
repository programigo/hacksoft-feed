import { type Request, type Response } from "express";

export async function getFeedbacks(req: Request, res: Response) {
    res.json({
        feedbacks:
            ["Ivan feedback", "Pesho feedback", "Bobo feedback"]
    })
}

export async function createFeedback(req: Request, res: Response) {
    try {
        if (!req.body.name) {
            return res.status(400).json({ message: "Name field not entered" })
        }

        res.json({ text: "You created feedback" })
    } catch (error: any) {
        console.error("An error occured while creating feedback", error)
        res.status(500).json({ message: error.toString() })
    }
}

export async function updateFeedback(req: Request, res: Response) {
    res.json({ message: `Feedback ${req.params.id} updated` })
}

export async function deleteFeedback(req: Request, res: Response) {
    res.json({ message: `Feedback ${req.params.id} deleted` })
}