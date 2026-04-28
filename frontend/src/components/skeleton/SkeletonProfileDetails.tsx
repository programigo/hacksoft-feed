import ContentContainer from "../layout/ContentContainer";
import SkeletonButton from "./primitives/SkeletonButton";
import SkeletonCircle from "./primitives/SkeletonCircle";
import SkeletonText from "./primitives/SkeletonText";

export default function SkeletonProfileDetails() {
    return (
        <div className="p-6">
            <div className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-xl">

                {/* HEADER */}
                <div className="pt-10 md:pt-14 pb-6 flex flex-col items-center space-y-4">
                    {/* Avatar */}
                    <SkeletonCircle size={144} className="mb-4" />

                    {/* Username */}
                    <SkeletonText className="w-48 h-8 mb-10" />

                    {/* Tabs */}

                    {/* Mobile */}
                    <div className="flex flex-col gap-2 md:hidden self-stretch">
                        <SkeletonButton className="w-full" />
                        <SkeletonButton className="w-full" />
                        <SkeletonButton className="w-full" />
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:flex gap-2">
                        <SkeletonButton className="w-36 h-10" />
                        <SkeletonButton className="w-36 h-10" />
                        <SkeletonButton className="w-36 h-10" />
                    </div>
                </div>

                {/* CONTENT (PersonalDetails Skeleton) */}
                <div className="px-6 pb-10 md:pb-14">
                    <div className="min-h-130 space-y-6">
                        <ContentContainer>
                            {/* Title */}
                            <div className="flex justify-center">
                                <SkeletonText className="w-56 h-7" />
                            </div>

                            {/* GRID (matches PersonalDetails exactly) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">

                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="p-4 bg-base-200 rounded-xl shadow-sm space-y-2"
                                    >
                                        <SkeletonText className="w-28 h-6" />
                                        <SkeletonText className="w-24 h-6" />
                                    </div>
                                ))}

                            </div>
                        </ContentContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}