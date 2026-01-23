import { Outlet } from "react-router";
import ThePageHeader from "../components/ThePageHeader";
import Footer from "../components/Footer";
import BackgroundAssets from "../components/BackgroundAssets";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-base-100">
            {/* Decorative background */}
            <BackgroundAssets />

            {/* Actual app UI */}
            <div className="relative z-10 flex h-screen flex-col">
                <ThePageHeader />

                <Toaster
                    position="top-center"
                    containerStyle={{
                        top: "4rem", // same as navbar height
                    }}
                />

                {/* Scrollable main content */}
                <main className="flex-1 overflow-y-auto pt-[4rem] pb-[4rem]">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    )
}