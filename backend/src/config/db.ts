import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
    const mongoUri: string | undefined = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    try {
        await mongoose.connect(mongoUri);

        console.log("Connection to MongoDb successful");
    } catch (error) {
        console.error("Error connecting to MongoDb", error);
        process.exit(1);
    }
}