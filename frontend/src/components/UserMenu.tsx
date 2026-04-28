import { useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useAuth } from "../store/auth/useAuth";
import toast from "react-hot-toast";
import defaultProfilePicture from "../assets/profile-default-picture.svg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import usersService from "../services/usersService";

export default function UserMenu() {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const {
        data: user,
        isLoading,
    } = useQuery({
        queryKey: ["user"],
        queryFn: usersService.getProfile,
    });

    useOutsideClick(
        [buttonRef, menuRef],
        () => setOpen(false),
        open,
    );

    function handleLogout() {
        logout();
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["posts"] })
        toast.success("Logout successful");
    }

    const displayUser = user ?? null;

    return (
        <div className="dropdown dropdown-end">
            <button
                ref={buttonRef}
                onClick={() => setOpen(prev => !prev)}
                className="btn btn-ghost rounded-full p-1 flex items-center gap-1"
            >
                {/* Animated Chevron */}
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                />

                {/* Avatar with fallback */}
                <ProfilePicture
                    className={`w-9 h-9 ${isLoading ? "opacity-60 animate-pulse" : ""}`}
                    alt={
                        displayUser
                            ? `${displayUser.username}'s profile picture`
                            : "User profile picture"
                    }
                    src={displayUser?.profilePicture || defaultProfilePicture}
                />
            </button>

            <ul
                ref={menuRef}
                className={`
                    top-[70px]
                    menu menu-sm dropdown-content rounded-box z-50
                    w-40 p-2 shadow bg-base-100
                    transition-all duration-300 transform
                    ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
                `}
            >
                <li>
                    <Link to="/users/me" onClick={() => setOpen(false)}>
                        My profile
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout}>
                        Log out
                    </button>
                </li>
            </ul>
        </div>
    );
}