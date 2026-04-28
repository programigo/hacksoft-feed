import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function SkeletonBox({ className, ...props }: SkeletonBoxProps) {
    return (
        <div
            aria-hidden="true"
            {...props}
            className={twMerge("w-full rounded-md bg-skeleton shimmer", className)}
        />
    );
}

type SkeletonBoxProps = HTMLAttributes<HTMLDivElement>;