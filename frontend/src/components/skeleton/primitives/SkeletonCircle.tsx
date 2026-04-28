import type { HTMLAttributes } from "react";
import SkeletonBox from "./SkeletonBox";
import { twMerge } from "tailwind-merge";

export default function SkeletonCircle({ size, className, style, ...props }: SkeletonCircleProps) {
    return (
        <SkeletonBox
            {...props}
            className={twMerge("rounded-full", className)}
            style={{
                width: size,
                height: size,
                ...style,
            }}
        />
    );
}

type SkeletonCircleProps = {
    size: number;
} & HTMLAttributes<HTMLDivElement>;