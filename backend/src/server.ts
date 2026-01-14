import "./config/dotenv.ts";
import express from "express";
import feedbackRoutes from "./routes/feedbackRoutes.ts";
import { connectDB } from "./config/db.ts";
import userRoutes from "./routes/userRoutes.ts";
import { env } from "./config/env.ts";

const app = express();
const PORT = env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/feedbacks", feedbackRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port", PORT);
    });
});