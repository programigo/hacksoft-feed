import "./config/dotenv.ts";
import express from "express";
import feedbackRoutes from "./routes/feedbackRoutes.ts";
import { connectDB } from "./config/db.ts";

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/feedbacks", feedbackRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port", PORT);
    });
});