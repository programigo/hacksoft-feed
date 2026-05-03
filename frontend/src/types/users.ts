export type User = {
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    profilePicture: string;
}

export type UserStats = {
    createdPostsCount: number;
    likedPostsCount: number;
}

export type ChangePasswordPayload = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}