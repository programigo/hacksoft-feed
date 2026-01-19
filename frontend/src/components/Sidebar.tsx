import type { ReactNode } from "react"

export default function Sidebar({ children }: SidebarProps) {
    return (
        <aside className="hidden md:block md:sticky md:top-20">
            {children}
        </aside>
    )
}

type SidebarProps = {
    children: ReactNode;
}