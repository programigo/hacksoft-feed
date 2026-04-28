import axios, { type AxiosResponse } from "axios";
import authService from "./authService";
import type { CreatePostModel, PostsResponse, UpdatePostModel } from "../types/posts";

const API_URL = "http://localhost:5001/api/posts/";
const USERS_API_URL = "http://localhost:5001/api/users/";

async function getPosts(page: number, limit: number): Promise<PostsResponse> {
    const token = authService.getToken();

    try {
        const response: AxiosResponse = await axios.get(API_URL, {
            params: {
                page,
                limit,
            },
            headers: token
                ? { Authorization: `Bearer ${token}` } // only send if token exists
                : {}, // empty headers if guest
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to load posts");
        }

        throw new Error("Unexpected error occurred");
    }
}

async function createPost(data: CreatePostModel): Promise<any> {
    try {
        const token = authService.getToken();

        const response: AxiosResponse
            = await axios.post(API_URL, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to create post");
        }

        throw new Error("Unexpected error occurred");
    }
}

async function updatePost(model: UpdatePostModel): Promise<any> {
    try {
        const token = authService.getToken();

        const response: AxiosResponse
            = await axios.put(API_URL + model.id, model.payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to update post");
        }

        throw new Error("Unexpected error occurred");
    }
}

async function deletePost(id: string): Promise<any> {
    try {
        const token = authService.getToken();

        const response: AxiosResponse = await axios.delete(API_URL + id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to delete post");
        }

        throw new Error("Unexpected error occurred");
    }
}

async function likePost(id: string) {
    try {
        const token = authService.getToken();

        const response: AxiosResponse = await axios.post(API_URL + id + "/like", null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to like post");
        }

        throw new Error("Unexpected error occurred");
    }
}

async function unlikePost(id: string) {
    try {
        const token = authService.getToken();

        const response: AxiosResponse = await axios.post(API_URL + id + "/unlike", null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw new Error(error?.response?.data?.message || "Failed to unlike post");
        }

        throw new Error("Unexpected error occurred");
    }
}

const postsService = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
};

export default postsService;