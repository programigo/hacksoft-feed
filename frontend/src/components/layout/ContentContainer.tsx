import type { HTMLAttributes, ReactNode } from "react";

export default function ContentContainer({
    children,
    ...props
}: ContentContainerProps) {

    return (
        <div
            {...props}
            className="card bg-base-100 shadow-lg px-8 py-4 space-y-6"
        >
            {children}
        </div>
    )
}

type ContentContainerProps = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;