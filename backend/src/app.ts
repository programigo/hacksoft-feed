import "./config/dotenv.js";
import cors from "cors";
import express from "express";
import postsRoutes from "./routes/postsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*",
    }),
);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

export default app;