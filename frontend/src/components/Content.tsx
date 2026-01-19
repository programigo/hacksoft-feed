import type { ReactNode } from "react";

export default function Content({ children }: ContentProps) {
    return (
        <div
            className="
            relative
                grid
                grid-cols-1
                gap-6
                md:grid-cols-[240px_1fr]
                pt-25 md:pt-32
                pb-25 md:pb-32
            "
        >
            {children}
        </div>
    )
}

type ContentProps = {
    children: ReactNode;
}