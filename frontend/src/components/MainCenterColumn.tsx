import type { ReactNode } from "react"

export default function MainCenterColumn({ children }: MainCenterColumnProps) {
    return (
        <main className="space-y-4">
            {children}
        </main>
    )
}

type MainCenterColumnProps = {
    children: ReactNode;
}