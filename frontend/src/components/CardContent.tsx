import type { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export function CardContent({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={twMerge(
                "px-3 py-4",
                className
            )}
        />
    )
}