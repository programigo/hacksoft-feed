import type { ReactNode } from "react";

export default function SkeletonForm({ children, footer, text }: SkeletonFormProps) {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    {text}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    {children}
                </form>

                {footer}
            </div>
        </div>
    )
}

type SkeletonFormProps = {
    children: ReactNode;
    footer?: ReactNode;
    text: string;
}