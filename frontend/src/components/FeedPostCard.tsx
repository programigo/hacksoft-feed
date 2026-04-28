import { Forward, ThumbsUp } from "lucide-react";
import Card from "./Card";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";
import CardHeader from "./CardHeader";
import ProfilePicture from "./ProfilePicture";
import { useAuth } from "../store/auth/useAuth";
import defaultProfilePicture from "../assets/profile-default-picture.svg";
import type { Post, PostsResponse } from "../types/posts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/users";
import userService from "../services/usersService";
import dayjs from "dayjs";
import { useState } from "react";
import { truncateText } from "../utils/text";
import Button from "./Button";
import postsService from "../services/postsService";
import toast from "react-hot-toast";
import AuthModal, { type AuthIntent } from "./auth/AuthModal";
import SkeletonFeedPostCard from "./skeleton/SkeletonFeedPostCard";
import ErrorBlock from "./ErrorBlock";

const MAX_CHARS = 100;

export default function FeedPostCard({ post }: FeedPostCardProps) {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const isGuest: boolean = !user;

    const [expanded, setExpanded] = useState<boolean>(false);
    const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
    const [authIntent, setAuthIntent] = useState<AuthIntent>("like_post");

    const isTruncated = post.text.length > MAX_CHARS;

    const displayText =
        expanded || !isTruncated
            ? post.text
            : truncateText(post.text, MAX_CHARS);

    // Fetch post creator info
    const {
        data: postCreator,
        isLoading,
        isError,
        error,
    } = useQuery<User>({
        queryKey: ["users", post.userId],
        queryFn: () => userService.getUser(post.userId),
    });

    // Like mutation with optimistic update
    const { mutate } = useMutation({
        mutationFn: () => postsService.likePost(post._id),

        // Optimistic update
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["posts"] });

            const previousData = queryClient.getQueryData<{
                pages: PostsResponse[];
                pageParams: unknown[];
            }>(["posts"]);

            if (!previousData) {
                return { previousData: undefined };
            }

            queryClient.setQueryData(["posts"], {
                ...previousData,
                pages: previousData.pages.map(page => ({
                    ...page,
                    posts: page.posts.map(p =>
                        p._id === post._id
                            ? { ...p, likes: p.likes + 1, hasLiked: true }
                            : p
                    ),
                })),
            });

            return { previousData };
        },

        onSettled: () => {
            // Refetch posts, so new likes appear
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["user", "stats"] });
        },

        onError: (_err, _postId, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["posts"], context.previousData);
            }

            toast.error("Failed to like post");
        },
    });

    /** Actions */

    function requireAuth(intent: AuthIntent): void {
        setAuthIntent(intent);
        setAuthModalOpen(true);
    }

    function handleLike() {
        if (isGuest) {
            requireAuth("like_post");
            return;
        }

        // Like the post only if the user hasn't liked it yet
        if (!post.hasLiked) {
            mutate();
        }
    }

    function handleShare() {
        if (isGuest) {
            requireAuth("share_post");
            return;
        }

        toast.success("Post shared");
    }

    if (isLoading) {
        return <SkeletonFeedPostCard />
    }

    if (!postCreator) {
        return (
            <Card>
                <ErrorBlock
                    title="No post creator data"
                    message="Something went wrong. Please try again."
                />
            </Card>

        )
    }

    if (isError) {
        return (
            <Card>
                <ErrorBlock
                    title="An error occured"
                    message={error.message || "Failed to fetch post creator"}
                />
            </Card>
        )
    }

    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <ProfilePicture
                            className="w-12 h-12"
                            src={postCreator.profilePicture || defaultProfilePicture}
                            alt={`${postCreator.username}'s profile picture`}
                        />
                    }
                    title={`${postCreator.firstName} ${postCreator.lastName}`}
                    subtitle={truncateText(postCreator.jobTitle, 30)}
                    meta={dayjs(post.createdAt).fromNow()}
                />

                <CardContent className="pb-3">
                    {/* TEXT */}
                    <span className="text-sm leading-relaxed break-all">
                        {displayText}
                    </span>

                    {/* SEE MORE */}
                    {isTruncated && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setExpanded((v) => !v)}
                                className="text-sm text-[#65676B] hover:underline"
                            >
                                {expanded ? "see less" : "…see more"}
                            </button>
                        </div>
                    )}

                    <div className="mt-2 flex items-center gap-1">
                        <Button className="w-4 h-4 rounded-full p-1 flex items-center justify-center cursor-default">
                            <ThumbsUp className="w-3 h-3" />
                        </Button>

                        <span className="text-xs translate-y-0 text-muted-foreground">
                            {post.likes}
                        </span>
                    </div>
                </CardContent>

                <CardFooter>
                    <button
                        onClick={handleLike}
                        className={`
                        flex items-center gap-2
                        ${isGuest ? "opacity-60 hover:opacity-100" : undefined}
                    `}
                    >
                        <ThumbsUp />
                        {post.hasLiked ? "Liked" : "Like"}
                    </button>

                    <button
                        onClick={handleShare}
                        className={`
                        flex items-center gap-1 cursor-pointer
                        ${isGuest ? "opacity-60 hover:opacity-100" : ""}
                    `}
                    >
                        <Forward /> Share
                    </button>
                </CardFooter>
            </Card>

            <AuthModal
                isOpen={authModalOpen}
                intent={authIntent}
                onClose={() => setAuthModalOpen(false)}
            />
        </>
    )
}

type FeedPostCardProps = {
    post: Post;
}