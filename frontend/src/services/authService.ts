import axios, { type AxiosResponse } from "axios";
import type { LoginData } from "../store/auth/types";

const API_URL = "http://localhost:5001/api/users/";

// Register user
async function signup(signupData: FormData) {
    try {
        const response: AxiosResponse = await axios.post(API_URL + "signup", signupData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to register user");
        }

        throw new Error("Unexpected error occurred");
    }
}

// Login user
async function login(loginData: LoginData) {
    try {
        const response: AxiosResponse = await axios.post(API_URL + "login", loginData);

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Login failed");
        }

        throw new Error("Unexpected error occurred");
    }
}

// Logout user
async function logout() {
    try {
        localStorage.removeItem("user");
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Logout failed");
        }

        throw new Error("Unexpected error occurred");
    }
}

function getToken() {
    const token = localStorage.getItem("token") || "";
    return token;
}

const authService = {
    signup,
    login,
    logout,
    getToken,
};

export default authService;