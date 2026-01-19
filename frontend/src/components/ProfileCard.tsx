import { PencilLine } from "lucide-react";
import Card from "./Card";
import ProfilePicture from "./ProfilePicture";
import CardHeader from "./CardHeader";
import { CardFooter } from "./CardFooter";

export default function ProfileCard() {
    return (
        <Card>
            <CardHeader
                size="sm"
                avatar={
                    <ProfilePicture
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        className="w-12 h-12"
                        alt="user.name"
                    />
                }
                title="Ivaylo Bachvarov"
                subtitle="Co-Founder, HackSoft"
                meta={
                    <button
                        className="text-base-content/60 hover:text-base-content"
                        aria-label="Edit profile"
                    >
                        <PencilLine className="w-4 h-4" />
                    </button>
                }
            />

            <CardFooter spaced>
                <div className="grid grid-cols-2 text-center text-sm w-full">
                    <div>
                        <div className="font-medium">210</div>
                        <div className="text-xs text-base-content/60">Likes</div>
                    </div>

                    <div className="border-l border-base-content/20">
                        <div className="font-medium">4</div>
                        <div className="text-xs text-base-content/60">Posts</div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}