import { useState, type ChangeEvent } from "react";
import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../services/usersService";
import toast from "react-hot-toast";

export default function EditProfilePictureModal({
    currentPicture,
    onClose,
}: EditProfilePictureModalProps) {
    const [preview, setPreview] = useState<string>(currentPicture);
    const [file, setFile] = useState<File | null>(null);

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("profilePicture", file);

            const data: UpdateProfilePictureResponse = await usersService.updateProfilePicture(formData);
            return data;
        },

        // --- OPTIMISTIC UPDATE ---
        onMutate: async (file: File) => {
            await queryClient.cancelQueries({ queryKey: ["user"] });

            const previousUser = queryClient.getQueryData<any>(["user"]);

            // Local preview URL
            const localPreviewUrl = URL.createObjectURL(file);

            // Update React Query cache optimistically
            queryClient.setQueryData(["user"], (old: any) => ({
                ...old,
                profilePicture: localPreviewUrl,
            }));

            // Also update local preview for immediate visual feedback
            setPreview(localPreviewUrl);

            return { previousUser };
        },

        onSuccess: (data: UpdateProfilePictureResponse) => {
            const newProfilePicture = data.profilePicture;

            // Sync cache with real backend URL
            queryClient.setQueryData(["user"], (old: any) => ({
                ...old,
                profilePicture: newProfilePicture,
            }));

            onClose();
            toast.success("Profile picture updated successfully");
        },

        onError: (_err: Error, _file, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData(["user"], context.previousUser);
                setPreview(context.previousUser?.profilePicture || "");
            }

            toast.error("Upload failed. Try again.");
        },
    });

    function handleChoose(e: ChangeEvent<HTMLInputElement>) {
        const chosenFile = e.target.files?.[0];

        if (chosenFile) {
            setFile(chosenFile);
            setPreview(URL.createObjectURL(chosenFile));
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-[380px] p-6 relative animate-fadeIn">

                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center">
                    Update Profile Picture
                </h2>

                {/* Preview circle */}
                <div className="flex justify-center mb-4">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover shadow-md"
                    />
                </div>

                {/* Choose File */}
                <label className="block w-full">
                    <div className="
                        bg-[#FD7500] text-white 
                        font-medium py-2 px-4 rounded-lg 
                        text-center cursor-pointer 
                        hover:bg-orange-400 transition
                    ">
                        Choose Image
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChoose}
                    />
                </label>

                {/* Upload button */}
                <button
                    onClick={() => file && mutate(file)}
                    disabled={!file || isPending}
                    className="
                        mt-4 w-full py-2 rounded-lg 
                        bg-green-600 disabled:bg-gray-400 
                        text-white font-medium 
                        hover:bg-green-500 transition
                    "
                >
                    {isPending ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
}

type EditProfilePictureModalProps = {
    currentPicture: string;
    onClose: () => void;
}

// This is what backend returns
export type UpdateProfilePictureResponse = {
    profilePicture: string; // Cloudinary URL
}