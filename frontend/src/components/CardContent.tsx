import { type HTMLAttributes, type ReactNode } from "react"
import { twMerge } from "tailwind-merge"

export function CardContent({
    children,
    className,
    ...props
}: CardContentProps) {
    

    return (
        <div
            {...props}
            className={twMerge(
                "px-3 py-4",
                className
            )}
        >
            {children}
        </div>
    )
}

type CardContentProps = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>