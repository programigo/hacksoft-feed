import { useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { useOutsideClick } from "../hooks/useOutsideClick";

export default function UserPanel() {
    const [open, setOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    useOutsideClick(
        [buttonRef, menuRef],
        () => setOpen(false),
        open,
    );

    function handleLogout() {
        // TODO: Logout logic
        setOpen(false);
    }

    return (
        <div className="dropdown dropdown-end">
            <button
                ref={buttonRef}
                onClick={() => setOpen(prevValue => !prevValue)}
                className="btn btn-ghost rounded-full p-1 flex items-center gap-1">
                {/* Animated Chevron */}
                <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />

                {/* Avatar */}
                <ProfilePicture
                    className="w-9 h-9"
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
                `}>
                <li>
                    <Link to="" onClick={() => setOpen(false)}>
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
    )
}