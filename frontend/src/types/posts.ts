export type UpdatePostModel = {
    id: string;
    payload: FormData;
}

export type CreatePostModel = {
    text: string;
}

export type Post = {
    _id: string;
    userId: string;
    text: string;
    likes: number;
    hasLiked: boolean;
    createdAt: string;
}

export type PostsResponse = {
    posts: Post[];
    total: number;
}