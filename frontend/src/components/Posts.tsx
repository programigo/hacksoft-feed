import FeedPostCard from "./FeedPostCard";

export default function Posts() {
    // TODO: Fetch all feedbacks/posts from database, loop through them (.map) and pass each post data to <Post /> component
    return (
        // posts.map(post => (
        //     <Post />
        // ))
        <>
            <FeedPostCard />
            <FeedPostCard />
            <FeedPostCard />
            <FeedPostCard />
            <FeedPostCard />
            <FeedPostCard />
        </>
    )
}