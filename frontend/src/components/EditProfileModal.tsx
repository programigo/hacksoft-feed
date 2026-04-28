import { useQuery } from "@tanstack/react-query";
import usersService from "../services/usersService";
import EditProfileForm from "./EditProfileForm";
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
            <BaseModal isOpen={isOpen} onClose={onClose} title="Edit profile">
                <ErrorBlock
                    title="An error occured"
                    message={error.message || "Failed to fetch user"}
                />
            </BaseModal>
        )
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Edit profile">
            <EditProfileForm user={user} onSuccess={onClose} variant="modal" />
        </BaseModal>
    )
}

type EditProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
}