import "./config/dotenv.ts";
import express from "express";
import postsRoutes from "./routes/postsRoutes.ts";
import { connectDB } from "./config/db.ts";
import usersRoutes from "./routes/usersRoutes.ts";
import cors from "cors";
import { env } from "./config/env.ts";

const app = express();
const PORT = env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: "*",
}));

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port", PORT);
    });
});