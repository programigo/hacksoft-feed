import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import User from "../models/User.js";

export default async function optionalAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return next(); // guest user
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;

        if (decoded && decoded.id) {
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = {
                id: user._id.toString(),
                username: user.username,
                email: user.email,
            };
        }
    } catch {

    }

    next();
}

interface AuthTokenPayload extends JwtPayload {
    id: string;
}