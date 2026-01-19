import { Outlet } from "react-router";
import ThePageHeader from "../components/ThePageHeader";
import Footer from "../components/Footer";
import BackgroundAssets from "../components/BackgroundAssets";

export default function RootLayout() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-base-100">
            {/* Decorative background */}
            <BackgroundAssets />

            {/* Actual app UI */}
            <div className="relative z-10 flex min-h-screen flex-col">
                <ThePageHeader />

                <main className="flex-1">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    )
}