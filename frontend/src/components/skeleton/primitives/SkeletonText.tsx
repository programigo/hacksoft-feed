import type { HTMLAttributes } from "react";
import SkeletonBox from "./SkeletonBox";
import { twMerge } from "tailwind-merge";

export default function SkeletonText({
    className,
    ...props
}: SkeletonTextProps) {
    return (
        <SkeletonBox
            {...props}
            className={twMerge("h-4 bg-skeleton-muted", className)}
        />
    );
}

type SkeletonTextProps = HTMLAttributes<HTMLDivElement>;