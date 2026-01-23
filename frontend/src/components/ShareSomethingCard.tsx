import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../store/auth/useAuth";
import Button from "./Button";
import Card from "./Card";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";
import postsService from "../services/postsService";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { type PostFormData, postSchema } from "../validation/postSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AuthIntent } from "./auth/AuthModal";
import { useState } from "react";
import AuthModal from "./auth/AuthModal";

export default function ShareSomethingCard() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
    const [authIntent, setAuthIntent] = useState<AuthIntent>("create_post");

    const isGuest: boolean = !user;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: postsService.createPost,

        onSuccess: () => {
            toast.success("Post created successfully");
            reset();

            // Refetch new posts and user stats
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["user", "stats"] });
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    function requireAuth(intent: AuthIntent): void {
        setAuthIntent(intent);
        setAuthModalOpen(true);
    }

    function handleRequireAuth() {
        requireAuth("create_post");
    }

    function onSubmit(data: PostFormData) {
        mutate({ text: data.text });
    }

    return (
        <>
            <Card>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <div className="relative">
                            <textarea
                                {...register("text")}
                                readOnly={isGuest}
                                onClick={isGuest ? handleRequireAuth : undefined}
                                className={`
                            w-full h-10 resize-none
                            outline-none focus:outline-none focus:ring-0
                            border ${errors.text ? "border-red-500" : "border-transparent"}
                            ${isGuest ? "cursor-pointer bg-gray-50" : ""}
                        `}
                                placeholder={
                                    isGuest
                                        ? "Join to share something with the community..."
                                        : "Share something to the community..."
                                }
                            />

                            {/* Tooltip for the error */}
                            {errors.text && (
                                <div className="absolute top-0 right-0 transform -translate-y-full bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                                    {errors.text.message}
                                </div>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="py-2">
                        <div className="flex justify-end w-full">
                            {isGuest ? (
                                <Button
                                    type="button"
                                    onClick={handleRequireAuth}
                                    className="h-8"
                                >
                                    Join to post
                                </Button>
                            ) : (
                                <Button
                                    className="h-8"
                                    type="submit"
                                    disabled={!isGuest && (isPending || isSubmitting)}
                                >
                                    Post
                                </Button>
                            )}

                        </div>
                    </CardFooter>
                </form>
            </Card>

            <AuthModal
                isOpen={authModalOpen}
                intent={authIntent}
                onClose={() => setAuthModalOpen(false)}
            />
        </>
    )
}