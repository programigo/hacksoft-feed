import Form from "./form/Form";
import FormInput from "./form/FormInput";
import { useMutation } from "@tanstack/react-query";
import usersService from "../services/usersService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";
import ContentContainer from "./layout/ContentContainer";
import type { ChangePasswordPayload } from "../types/users";

const formSchema = z.object({
    currentPassword: z.string().min(1, "The current password field is required."),
    newPassword: z
        .string()
        .min(6, "You must provide a password with at least 6 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special symbol."),

    confirmPassword: z.string(),
})
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match.",
        }
    );

type FormValues = z.infer<typeof formSchema>;

export default function ChangePassword() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: usersService.changePassword,
        onSuccess: () => {
            toast.success("Password was changed successfully");
            navigate("/");
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    function onSubmit(values: FormValues) {
        const changePasswordData: ChangePasswordPayload = {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        };

        mutate(changePasswordData);
    }

    return (
        <ContentContainer>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                text="Change Password"
            >
                <FormInput
                    label="Current password"
                    type="password"
                    registration={register("currentPassword")}
                    error={errors.currentPassword}
                />

                <FormInput
                    label="New password"
                    type="password"
                    registration={register("newPassword")}
                    error={errors.newPassword}
                />

                <FormInput
                    label="Confirm password"
                    type="password"
                    registration={register("confirmPassword")}
                    error={errors.confirmPassword}
                />

                <Button
                    disabled={isPending || isSubmitting}
                    type="submit"
                    className="w-full px-4 py-2">
                    {(isPending || isSubmitting) && (
                        <span className="loading loading-spinner loading-sm"></span>
                    )}
                    {isPending || isSubmitting ? "Updating..." : "Update"}
                </Button>
            </Form>
        </ContentContainer>
    )
}