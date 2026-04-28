import Card from "../Card";
import { CardFooter } from "../CardFooter";
import CardHeader from "../CardHeader";
import SkeletonCircle from "./primitives/SkeletonCircle";
import SkeletonText from "./primitives/SkeletonText";

export default function SkeletonProfileCard() {
    return (
        <Card>
            {/* HEADER */}
            <CardHeader
                size="sm"
                avatar={<SkeletonCircle size={52} />}
                title={<SkeletonText className="w-28" />}
                subtitle={<SkeletonText className="w-20 mt-1" />}
                meta={
                    <div className="w-6 h-6 flex items-center justify-center">
                        <SkeletonCircle size={16} />
                    </div>
                }
            />

            {/* FOOTER (STATS) */}
            <CardFooter spaced>
                <div className="grid grid-cols-2 text-center text-sm w-full">
                    {/* Likes */}
                    <div>
                        <SkeletonText className="w-8 mx-auto" />
                        <SkeletonText className="w-12 mx-auto mt-1" />
                    </div>

                    {/* Posts */}
                    <div className="border-l border-base-content/20">
                        <SkeletonText className="w-8 mx-auto" />
                        <SkeletonText className="w-12 mx-auto mt-1" />
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}