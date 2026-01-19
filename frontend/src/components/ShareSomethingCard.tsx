import Card from "./Card";
import { CardContent } from "./CardContent";
import { CardFooter } from "./CardFooter";

export default function ShareSomethingCard() {
    return (
        <Card>
            <CardContent>
                <textarea
                    className="w-full h-10 resize-none
                                outline-none focus:outline-none focus:ring-0
                                border-transparent"
                    placeholder="Share something to the community..."
                />
            </CardContent>

            <CardFooter className="py-2">
                <div className="flex justify-end w-full">
                    <button className="btn btn-warning btn-sm w-[77px] text-white">
                        Post
                    </button>
                </div>
            </CardFooter>
        </Card>
    )
}