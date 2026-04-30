import { useForm } from "react-hook-form";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import { useAuth } from "../../store/auth/useAuth";
import { signupSchema, type SignupFormData } from "../../validation/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { ImageFile } from "../../types/images";
import PicturePicker from "../PicturePicker";
import toast from "react-hot-toast";
import Button from "../Button";

export default function SignupForm({ onSuccess, variant }: SignupFormProps) {
    const { loading, signup } = useAuth();

    const [profilePicture, setProfilePicture] = useState<ImageFile | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    async function onSubmit(data: SignupFormData) {
        try {
            // Build form data form the request
            const signupData = new FormData();

            signupData.append("username", data.username);
            signupData.append("password", data.password);
            signupData.append("email", data.email);
            signupData.append("firstName", data.firstName);
            signupData.append("lastName", data.lastName);
            signupData.append("jobTitle", data.jobTitle);

            if (profilePicture?.file) {
                signupData.append("profilePicture", profilePicture.file);
            }

            await signup(signupData);

            toast.success("Registration successsful");

            onSuccess();
        } catch (error: any) {
            toast.error(error.message || "Register failed");
        }
    }

    function handleImageChange(incoming: ImageFile | null) {
        setProfilePicture(incoming);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            text="Create account"
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

            <FormInput
                label="Confirm password"
                type="password"
                registration={register("confirmPassword")}
                error={errors.confirmPassword}
            />

            <FormInput
                label="Email"
                registration={register("email")}
                error={errors.email}
            />

            <FormInput
                label="First name"
                registration={register("firstName")}
                error={errors.firstName}
            />

            <FormInput
                label="Last name"
                registration={register("lastName")}
                error={errors.lastName}
            />

            <FormInput
                label="Job title"
                registration={register("jobTitle")}
                error={errors.jobTitle}
            />

            <PicturePicker
                image={profilePicture}
                label="Profile Photo (optional)"
                onImageChange={handleImageChange}
            />

            <Button
                disabled={loading || isSubmitting}
                type="submit"
                className="flex w-full justify-center px-3 py-1.5 text-sm/6 font-semibold"
            >
                {(loading || isSubmitting) && (
                    <span className="loading loading-spinner loading-sm"></span>
                )}
                {loading || isSubmitting ? "Loading..." : "Sign up"}
            </Button>
        </Form>
    )
}

type SignupFormProps = {
    onSuccess: () => void;
    variant?: "default" | "modal";
}