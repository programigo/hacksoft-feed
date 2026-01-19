import { Forward, ThumbsUp } from "lucide-react";
import Card from "./Card";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";
import CardHeader from "./CardHeader";
import ProfilePicture from "./ProfilePicture";

export default function FeedPostCard() {
    return (
        <Card>
            <CardHeader
                avatar={
                    <ProfilePicture
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        className="w-12 h-12"
                    />
                }
                title="Daniel Goshev"
                subtitle="Software Developer, HackSoft"
                meta="20 minutes ago"
            />

            <CardContent>
                <p className="text-sm leading-relaxed">
                    Despite our total project numbers only increasing by 2% compared
                    to last month, the 58 projects we are working on contain a
                    significant increase in deliverables.
                </p>
            </CardContent>

            <CardFooter>
                <button className="flex items-center gap-2">
                    <ThumbsUp /> Like
                </button>
                <button className="flex items-center gap-1">
                    <Forward /> Share
                </button>
            </CardFooter>
        </Card>
    )
}