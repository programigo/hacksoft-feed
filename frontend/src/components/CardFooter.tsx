import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type CardFooterProps = {
    divider?: boolean;
    spaced?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function CardFooter({
    divider = true,
    spaced = false,
    className,
    ...props
}: CardFooterProps) {
    return (
        <div
            {...props}
            className={twMerge(
                "flex items-center justify-between px-3 py-3",
                divider && "border-t border-base-content/20",
                spaced && "mt-4",
                className
            )}
        />
    )
}