import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export default function Card({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={twMerge(
                "bg-base-100 shadow-md rounded-md",
                className
            )}
        />
    )
}