import { PencilLine } from "lucide-react";
import Card from "./Card";
import ProfilePicture from "./ProfilePicture";
import CardHeader from "./CardHeader";
import { CardFooter } from "./CardFooter";
import defaultProfilePicture from "../assets/profile-default-picture.svg";
import { useQuery } from "@tanstack/react-query";
import usersService from "../services/usersService";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import SkeletonProfileCard from "./skeleton/SkeletonProfileCard";
import ErrorBlock from "./ErrorBlock";

export default function ProfileCard() {
    const [editProfileModalOpen, setEditProfileModalOpen] = useState<boolean>(false);

    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["user"],
        queryFn: usersService.getProfile,
    });

    const {
        data: userStats,
    } = useQuery({
        queryKey: ["user", "stats"],
        queryFn: usersService.getUserStats,
    });

    if (isLoading) {
        return <SkeletonProfileCard />;
    }

    if (isError) {
        return (
            <Card>
                <ErrorBlock
                    title="An error occured"
                    message={error.message || "Failed to fetch profile info"}
                />
            </Card>
        )
    }

    return (
        <>
            <Card>
                <CardHeader
                    size="sm"
                    avatar={
                        <ProfilePicture
                            className="w-12 h-12"
                            alt={user ? `${user.username}'s profile picture` : "User profile picture"}
                            src={user?.profilePicture || defaultProfilePicture}
                        />
                    }
                    title={`${user?.firstName} ${user?.lastName}`}
                    subtitle={user?.jobTitle}
                    meta={
                        <button
                            onClick={() => setEditProfileModalOpen(true)}
                            className="text-base-content/60 hover:text-base-content cursor-pointer"
                            aria-label="Edit profile"
                        >
                            <PencilLine className="w-4 h-4" />
                        </button>
                    }
                />

                <CardFooter spaced>
                    <div className="grid grid-cols-2 text-center text-sm w-full">
                        <div>
                            <div className="font-medium">{userStats?.likedPostsCount}</div>
                            <div className="text-xs text-base-content/60">Likes</div>
                        </div>

                        <div className="border-l border-base-content/20">
                            <div className="font-medium">{userStats?.createdPostsCount}</div>
                            <div className="text-xs text-base-content/60">Posts</div>
                        </div>
                    </div>
                </CardFooter>
            </Card>

            <EditProfileModal
                isOpen={editProfileModalOpen} onClose={() => setEditProfileModalOpen(false)}
            />
        </>
    )
}