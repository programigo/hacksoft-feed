import { useQuery } from "@tanstack/react-query";
import usersService from "../services/usersService";
import EditProfile from "./EditProfile";
import BaseModal from "./layout/BaseModal";
import ErrorBlock from "./ErrorBlock";

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const {
        data: user,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["user"],
        queryFn: usersService.getProfile,
    });

    if (isPending) {
        return null;
    }

    if (isError) {
        return (
            <ErrorBlock
                title="An error occured"
                message={error.message || "Failed to fetch user"}
            />
        )
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Edit profile">
            <EditProfile user={user} />
        </BaseModal>
    )
}

type EditProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
}