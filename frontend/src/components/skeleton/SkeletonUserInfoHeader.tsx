import SkeletonCircle from "./primitives/SkeletonCircle";
import SkeletonText from "./primitives/SkeletonText";

export default function SkeletonUserInfoHeader() {
    return (
        <div className="flex items-center gap-6">
            <SkeletonCircle size={96} />
            <div className="space-y-3">
                <SkeletonText className="h-6 w-48" />
                <SkeletonText className="w-32" />
            </div>
        </div>
    )
}