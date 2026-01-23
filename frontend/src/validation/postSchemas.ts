import { z } from "zod";

const textSchema = z.string().trim().min(30, "Post text must be at least 30 characters long");

export const postSchema = z.object({
    text: textSchema,
});

export type PostFormData = z.infer<typeof postSchema>;