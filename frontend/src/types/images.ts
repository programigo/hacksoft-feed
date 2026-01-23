// This is what backend returns
export type UpdateProfilePictureResponse = {
    profilePicture: string; // Cloudinary URL
}

export type ImageFile = {
    id: string;
    file?: File | null;
    url: string; // remote URL (for existing images) or object URL for previews
    isExisting?: boolean;
    publicId?: string | null;
}