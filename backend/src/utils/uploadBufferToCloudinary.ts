import cloudinary from "../config/cloudinary.ts";
import { type UploadApiErrorResponse, type UploadApiResponse, type UploadStream } from "cloudinary";

// Helper to upload buffer to Cloudinary via upload_stream and return the result
export default async function uploadBufferToCloudinary(
    buffer: Buffer,
    options = {}
): Promise<UploadApiResponse> {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        const stream: UploadStream = cloudinary.uploader.upload_stream(
            options,
            (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (!result) {
                    reject(new Error("Cloudinary upload failed: no result returned"));
                    return;
                }

                resolve(result);
            });

        stream.end(buffer);
    })
}