import Card from "../Card";
import { CardContent } from "../CardContent";
import { CardFooter } from "../CardFooter";
import CardHeader from "../CardHeader";
import SkeletonCircle from "./primitives/SkeletonCircle";
import SkeletonText from "./primitives/SkeletonText";

export default function SkeletonFeedPostCard() {
    return (
        <Card>
            {/* HEADER */}
            <CardHeader
                avatar={<SkeletonCircle size={48} />}
                title={<SkeletonText className="w-32" />}
                subtitle={<SkeletonText className="w-24 mt-1" />}
                meta={<SkeletonText className="w-12" />}
            />

            {/* CONTENT */}
            <CardContent className="pb-3 space-y-3">
                {/* TEXT */}
                <div className="space-y-2">
                    <SkeletonText className="w-full" />
                    <SkeletonText className="w-11/12" />
                </div>

                {/* SEE MORE (optional visual hint) */}
                <div className="flex justify-end">
                    <SkeletonText className="w-16" />
                </div>

                {/* LIKES */}
                <div className="mt-2 flex items-center gap-2">
                    <SkeletonCircle size={19} />
                    <SkeletonText className="w-6" />
                </div>
            </CardContent>

            {/* FOOTER */}
            <CardFooter>
                <div className="flex items-center gap-2">
                    <SkeletonCircle size={18} />
                    <SkeletonText className="w-12" />
                </div>

                <div className="flex items-center gap-2">
                    <SkeletonCircle size={18} />
                    <SkeletonText className="w-14" />
                </div>
            </CardFooter>
        </Card>
    )
}