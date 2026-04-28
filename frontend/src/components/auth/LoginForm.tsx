import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import type { LoginData } from "../../store/auth/types";
import { useAuth } from "../../store/auth/useAuth";
import { type LoginFormData, loginSchema } from "../../validation/authSchemas";
import Button from "../Button";
import FormInput from "../form/FormInput";
import Form from "../form/Form";

export default function LoginForm({ onSuccess, variant }: LoginFormProps) {
    const { loading, login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginFormData) {
        try {
            const loginData: LoginData = {
                username: data.username,
                password: data.password
            };

            await login(loginData);

            toast.success("Login successful");

            onSuccess();
        } catch (error: any) {
            toast.error(error.message || "Login failed");
        }
    }
    
    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            text="Login to your account"
            variant={variant}
        >
            <FormInput
                label="Username"
                registration={register("username")}
                error={errors.username}
            />

            <FormInput
                label="Password"
                type="password"
                registration={register("password")}
                error={errors.password}
            />

            <Button
                disabled={loading || isSubmitting}
                type="submit"
                className="flex w-full justify-center px-3 py-1.5 text-sm/6 font-semibold"
            >
                {(loading || isSubmitting) && (
                    <span className="loading loading-spinner loading-sm"></span>
                )}
                {loading || isSubmitting ? "Logging in..." : "Log in"}
            </Button>
        </Form>
    )
}

type LoginFormProps = {
    onSuccess: () => void;
    variant?: "default" | "modal";
}