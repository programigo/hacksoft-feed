import type { ReactNode } from "react";

export default function PageContainer({ children }: Props) {
    return (
        <div
            className="
                mx-auto w-full
                max-w-209.5
                px-4
                sm:px-6
                md:px-8
            "
        >
            {children}
        </div>
    )
}

type Props = {
    children: ReactNode;
}