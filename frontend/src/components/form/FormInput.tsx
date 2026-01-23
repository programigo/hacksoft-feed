import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

export default function FormInput({ label, registration, error, ...props }: FormInputProps) {
    const inputId = props.id ?? registration.name;

    return (
        <div>
            <label
                htmlFor={inputId}
                className="block text-sm/6 font-medium text-gray-100"
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
                    bg-white/5
                    px-3
                    py-1.5
                    text-base
                    text-white
                    outline-1
                    -outline-offset-1
                     outline-white/10
                     placeholder:text-gray-500
                    focus:outline-2
                    focus:-outline-offset-2
                     focus:outline-orange-400 sm:text-sm/6
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