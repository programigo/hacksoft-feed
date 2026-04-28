import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

export default function FormInput({ label, registration, error, ...props }: FormInputProps) {
    const inputId = props.id ?? registration.name;

    return (
        <div>
            <label
                htmlFor={inputId}
                className="block text-sm font-medium text-base-content"
            >
                {label}
            </label>

            <input
                id={inputId}
                {...props}
                {...registration}
                className="
                    mt-2
                    w-full
                    rounded-md
                    border
                    border-base-300
                    bg-base-100
                    px-3
                    py-2
                    text-base-content
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary
                "
            />

            {error?.message && <span className="error">{error.message}</span>}
        </div>
    )
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
}