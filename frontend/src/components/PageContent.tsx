import type { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function PageContent({ children, className }: PageContentProps) {
    return (
        <div className={twMerge("pt-25 md:pt-32 pb-25 md:pb-32", className)}>
            {children}
        </div>
    )
}

type PageContentProps = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;