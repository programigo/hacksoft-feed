// Validates all required env vars once
function requireEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} is missing`);
    }

    return value;
}

export const env = {
    CLOUD_NAME: requireEnv("CLOUD_NAME"),
    CLOUDINARY_API_KEY: requireEnv("CLOUDINARY_API_KEY"),
    CLOUDINARY_API_SECRET: requireEnv("CLOUDINARY_API_SECRET"),
    JWT_SECRET: requireEnv("JWT_SECRET"),
    MONGO_URI: requireEnv("MONGO_URI"),
    PORT: requireEnv("PORT"),
};