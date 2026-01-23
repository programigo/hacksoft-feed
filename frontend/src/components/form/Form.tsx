import type { FormHTMLAttributes, ReactNode } from "react";

export default function Form({ children, text, variant = "default", ...props }: FormProps) {
    return (
        <div
            className={
                variant === "modal"
                    ? "w-full" // modal handles centering
                    : "flex min-h-0 items-center justify-center bg-muted/40 px-4 py-6"
            }
        >
            <div
                className={`w-full max-w-sm rounded-xl p-6 shadow-sm ${
                    variant === "modal" ? "bg-white dark:bg-gray-900" : "bg-background"
                }`}
            >
                {text && (
                    <h2
                        className={`mb-6 text-center text-2xl font-semibold tracking-tight ${
                            variant === "modal" ? "text-gray-900 dark:text-white" : ""
                        }`}
                    >
                        {text}
                    </h2>
                )}

                <form {...props} className="space-y-4">
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