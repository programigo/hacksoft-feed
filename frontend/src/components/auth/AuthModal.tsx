import { useEffect, useRef, useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useQueryClient } from "@tanstack/react-query";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { X } from "lucide-react";
import BaseModal from "../layout/BaseModal";

export default function AuthModal({ isOpen, intent, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">("signup");
    const queryClient = useQueryClient();

    const defaultMode = intent === "create_post" ? "signup" : "login";

    useEffect(() => {
        if (isOpen) {
            setMode(defaultMode);
        }
    }, [isOpen, defaultMode]);


    if (!isOpen) {
        return null;
    }

    function handleSuccess() {
        // Close modal
        onClose();

        // Refetch posts so hasLiked and other user-dependent info updates
        queryClient.invalidateQueries({ queryKey: ["posts"] });
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={mode === "login" ? "Login" : "Create account"}>
            {/* Scrollable content */}
            <div className="p-4 flex-1 overflow-y-auto">
                {mode === "login" ? (
                    <LoginForm onSuccess={handleSuccess} variant="modal" />
                ) : (
                    <SignupForm onSuccess={handleSuccess} variant="modal" />
                )}

                {/* Switch mode */}
                <div className="mt-4 text-center">
                    {mode === "login" ? (
                        <button
                            onClick={() => setMode("signup")}
                            className="text-blue-500"
                        >
                            Don’t have an account? Register
                        </button>
                    ) : (
                        <button
                            onClick={() => setMode("login")}
                            className="text-blue-500"
                        >
                            Already have an account? Login
                        </button>
                    )}
                </div>
            </div>
        </BaseModal>
    );
}

type AuthModalProps = {
    isOpen: boolean;
    intent: AuthIntent;
    onClose: () => void;
}

export type AuthIntent =
    | "like_post"
    | "share_post"
    | "create_post";