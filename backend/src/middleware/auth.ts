import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "../config/env.ts";
import User from "../models/User.ts";

export default async function protect(req: Request, res: Response, next: NextFunction) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;

            // Get user from the token (get only the id, username and email fields)
            const user = await User.findById(decoded.id).select("_id username email");

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = {
                id: user._id.toString(),
                username: user.username,
                email: user.email,
            };

            next();
        } catch (error: any) {
            console.error(error);
            return res.status(401).json({ message: "Not authorized" });
        }
    } else {
        return res.status(401).json({ message: "No authorization token exists" });
    }
}

interface AuthTokenPayload extends JwtPayload {
    id: string;
}