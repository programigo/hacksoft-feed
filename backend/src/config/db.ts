import mongoose from "mongoose";
import { env } from "./env.ts";

export async function connectDB(): Promise<void> {
    try {
        const mongoUri: string = env.MONGO_URI;
        await mongoose.connect(mongoUri);

        console.log("Connection to MongoDb successful");
    } catch (error) {
        console.error("Error connecting to MongoDb", error);
        process.exit(1);
    }
}