import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={twMerge(
                "rounded px-6 py-0.5 cursor-pointer gap-2.5 text-white bg-[#FD7500] hover:bg-orange-400",
                className
            )}
        >
            {children}
        </button>
    )
}

type ButtonProps = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;