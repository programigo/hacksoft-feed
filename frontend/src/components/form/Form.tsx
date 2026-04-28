import type { FormHTMLAttributes, ReactNode } from "react";

export default function Form({ children, text, variant = "default", ...props }: FormProps) {
    return (
        <div
            className={
                variant === "modal"
                    ? "w-full"
                    : "flex flex-col"
            }
        >
            <div className="w-full rounded-xl p-6 shadow-md bg-base-100">
                {text && (
                    <h2 className="mb-6 text-center text-2xl font-semibold text-base-content">
                        {text}
                    </h2>
                )}

                <form {...props} className="space-y-4 min-h-[200px]">
                    {children}
                </form>
            </div>
        </div>
    );
}

type FormProps = {
    children: ReactNode;
    text?: string;
    variant?: "default" | "modal";
} & FormHTMLAttributes<HTMLFormElement>;