import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export default function generateToken(id: Types.ObjectId): string {
    return jwt.sign(
        { id },
        env.JWT_SECRET,
        { expiresIn: "30d" },
    );
}