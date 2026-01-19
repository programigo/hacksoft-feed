import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CardHeaderProps = {
    avatar: ReactNode
    title: ReactNode
    subtitle?: ReactNode
    meta?: ReactNode
    size?: "sm" | "lg"
    className?: string
}

export default function CardHeader({
    avatar,
    title,
    subtitle,
    meta,
    size = "lg",
    className,
}: CardHeaderProps) {
    const sizes = {
        sm: {
            gap: "gap-3",
            title: "text-sm font-semibold",
            subtitle: "text-xs text-base-content/60",
            meta: "text-xs",
        },
        lg: {
            gap: "gap-3",
            title: "text-base font-semibold",
            subtitle: "text-sm text-base-content/60",
            meta: "text-xs",
        },
    }

    const s = sizes[size]

    return (
        <div className={twMerge("relative px-3 pt-3", className)}>
            {/* Top-right meta */}
            {meta && (
                <div className={twMerge(
                    "absolute top-3 right-3",
                    s.meta
                )}>
                    {meta}
                </div>
            )}

            {/* Left content */}
            <div className={twMerge("flex items-center", s.gap)}>
                {avatar}

                <div>
                    <div className={s.title}>
                        {title}
                    </div>

                    {subtitle && (
                        <div className={s.subtitle}>
                            {subtitle}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}