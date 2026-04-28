import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import SkeletonBox from "./SkeletonBox";

export default function SkeletonButton({ className, ...props }: SkeletonButtonProps) {
    return (
        <SkeletonBox
            {...props}
            className={twMerge("h-10 rounded-xl bg-skeleton-muted", className)}
        />
    );
}

type SkeletonButtonProps = HTMLAttributes<HTMLDivElement>;