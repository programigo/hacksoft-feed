import type { AxiosResponse } from "axios";
import axios from "axios";
import authService from "./authService";
import type { UpdateProfilePictureResponse } from "../types/images";
import type { ChangePasswordPayload, User, UserStats } from "../types/users";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/users/`;

export async function getProfile(): Promise<User> {
    try {
        const token = authService.getToken();

        const response: AxiosResponse = await axios.get(API_URL + "me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to load profile");
        }

        throw new Error("Unexpected error occurred");
    }
}

export async function getUser(userId: string): Promise<User> {
    try {
        const response: AxiosResponse = await axios.get(API_URL + userId);

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to fetch user");
        }

        throw new Error("Unexpected error occurred");
    }
}

export async function getUserStats(): Promise<UserStats> {
    try {
        const token = authService.getToken();

        const response: AxiosResponse = await axios.get(API_URL + "me/get-stats", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to load user stats");
        }

        throw new Error("Unexpected error occurred");
    }
}

export async function editProfile(userInfo: Partial<Omit<User, "_id">>) {
    try {
        const token = authService.getToken();

        const response: AxiosResponse = await axios.patch(API_URL + "me", userInfo, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to update profile");
        }

        throw new Error("Unexpected error occurred");
    }
}

export async function updateProfilePicture(formData: FormData): Promise<UpdateProfilePictureResponse> {
    try {
        const token = authService.getToken();

        const response: AxiosResponse<UpdateProfilePictureResponse> = await axios.put(
            API_URL + "me/update-profile-picture",
            formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to update profile picture");
        }

        throw new Error("Unexpected error occurred");
    }
}

export async function changePassword(changePasswordData: ChangePasswordPayload) {
    try {
        const token = authService.getToken();

        const response: AxiosResponse = await axios.post(API_URL + "me/change-password", changePasswordData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Unexpected error");
        }

        throw new Error("Unexpected error occurred");
    }
}

const userService = {
    getProfile,
    getUser,
    getUserStats,
    editProfile,
    changePassword,
    updateProfilePicture,
};

export default userService;