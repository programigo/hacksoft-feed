import MainLink from "./MainLink";
import UserPanel from "./UserPanel";

export default function ThePageHeader() {
    return (
        <div className="navbar bg-white shadow-sm fixed top-0 z-50">
            <div className="w-full px-3 sm:px-4 md:px-8 lg:px-12 py-3 flex justify-between">
                <MainLink />
                <UserPanel />
            </div>
        </div>
    )
}