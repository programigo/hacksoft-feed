export default function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
    return (
        <>
            {/* Mobile (stacked buttons) */}
            <div className="flex flex-col gap-2 mt-4 md:hidden self-stretch">
                <button
                    className={`btn btn-outline w-full ${activeTab === "overview" ? "btn-active" : ""
                        }`}
                    onClick={() => onTabChange("overview")}
                >
                    Personal Details
                </button>

                <button
                    className={`btn btn-outline w-full ${activeTab === "edit" ? "btn-active" : ""
                        }`}
                    onClick={() => onTabChange("edit")}
                >
                    Edit Profile
                </button>

                <button
                    className={`btn btn-outline w-full ${activeTab === "password" ? "btn-active" : ""
                        }`}
                    onClick={() => onTabChange("password")}
                >
                    Change Password
                </button>
            </div>

            {/* Desktop (real tabs) */}
            <div className="tabs tabs-boxed mt-4 hidden md:flex">
                <button
                    className={`tab text-lg ${activeTab === "overview" ? "tab-active" : ""}`}
                    onClick={() => onTabChange("overview")}
                >
                    Personal Details
                </button>
                <button
                    className={`tab text-lg ${activeTab === "edit" ? "tab-active" : ""}`}
                    onClick={() => onTabChange("edit")}
                >
                    Edit Profile
                </button>
                <button
                    className={`tab text-lg ${activeTab === "password" ? "tab-active" : ""}`}
                    onClick={() => onTabChange("password")}
                >
                    Change Password
                </button>
            </div>
        </>

    )
}

type NavigationTabsProps = {
    activeTab: NavigationTabType;
    onTabChange: (tabType: NavigationTabType) => void;
}

export type NavigationTabType =
    | "overview"
    | "edit"
    | "password"