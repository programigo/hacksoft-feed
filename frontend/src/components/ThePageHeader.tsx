import { Link } from "react-router";
import MainLink from "./MainLink";
import UserMenu from "./UserMenu";
import { useAuth } from "../store/auth/useAuth";

export default function ThePageHeader() {
    const { user } = useAuth();

    return (
        <div className="navbar bg-white shadow-sm fixed top-0 z-50">
            <div className="w-full px-3 sm:px-4 md:px-8 lg:px-12 py-3 flex justify-between">
                <MainLink />

                {user ? (
                    <UserMenu />
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/signup" className="btn btn-ghost">Signup</Link>
                    </div>
                )}
            </div>
        </div>
    )
}