import { useInfiniteQuery } from "@tanstack/react-query";
import FeedPostCard from "./FeedPostCard";
import postsService from "../services/postsService";
import type { PostsResponse } from "../types/posts";
import Button from "./Button";

export default function Posts() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isPending,
        isError,
        error,
    } = useInfiniteQuery<PostsResponse, Error>({
        queryKey: ["posts"],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => postsService.getPosts(pageParam as number, 5),
        getNextPageParam: (lastPage, allPages) => {
            const loaded: number = allPages.reduce(
                (sum, page) => sum + page.posts.length,
                0
            );

            return loaded < lastPage.total
                ? allPages.length + 1
                : undefined;
        },
    });

    const posts = data?.pages.flatMap(p => p.posts) ?? [];

    return (
        <>
            {posts.map(post => (
                <FeedPostCard
                    key={post._id}
                    post={post}
                />
            ))}

            {hasNextPage && (
                <div className="flex justify-center">
                    <Button className="h-8" onClick={() => fetchNextPage()}>
                        {isFetchingNextPage ? "Loading..." : "Load more"}
                    </Button>
                </div>
            )}
        </>
    )
}