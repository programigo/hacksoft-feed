import { useState } from "react";
import { Pencil } from "lucide-react";
import type { User } from "../types/users";
import EditProfilePictureModal from "./EditProfilePictureModal";

export default function ProfileAvatar({ user, defaultProfilePicture }: ProfileAvatarProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div className="relative group w-36 h-36 mx-auto">
            {/* Avatar circle */}
            <img
                src={user?.profilePicture || defaultProfilePicture}
                alt={`${user.username}'s avatar`}
                className="w-36 h-36 rounded-full object-cover ring ring-primary ring-offset-2 shadow-xl"
            />

            {/* Hover edit button (Discord style) */}
            <button
                onClick={() => setShowModal(true)}
                className="
                    opacity-0 group-hover:opacity-100
                    absolute bottom-2 right-2
                    p-2 rounded-full
                    bg-black/60 hover:bg-black/80
                    text-white transition
                "
            >
                <Pencil size={18} />
            </button>

            {showModal && (
                <EditProfilePictureModal
                    currentPicture={user.profilePicture || defaultProfilePicture}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    )
}

type ProfileAvatarProps = {
    user: User;
    defaultProfilePicture: string;
}
