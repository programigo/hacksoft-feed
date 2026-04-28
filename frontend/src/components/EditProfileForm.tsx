import Form from "./form/Form";
import FormInput from "./form/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usersService from "../services/usersService";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "./Button";
import ContentContainer from "./layout/ContentContainer";
import type { User } from "../types/users";

const formSchema = z.object({
    firstName: z
        .string()
        .min(2, "The first name field is required."),

    lastName: z
        .string()
        .min(2, "The last name field is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditProfileForm({ user, onSuccess, variant }: EditProfileFormProps) {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: usersService.editProfile,
        onSuccess: async () => {
            toast.success("Profile data edited successfully");
            await queryClient.invalidateQueries({ queryKey: ["user"] });

            onSuccess();
        },
        onError: (err: Error) => {
            toast.error(err.message);
        },
    });

    function onSubmit(values: FormValues) {
        const userInfo = {
            firstName: values.firstName,
            lastName: values.lastName,
        };

        mutate(userInfo);
    }

    return (
        <ContentContainer>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                text="Edit Personal Details"
                variant={variant}
            >
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

                <Button
                    disabled={isPending || isSubmitting}
                    type="submit"
                    className="w-full px-4 py-2">
                    {(isPending || isSubmitting) && (
                        <span className="loading loading-spinner loading-sm"></span>
                    )}
                    {isPending || isSubmitting ? "Saving..." : "Save"}
                </Button>
            </Form>
        </ContentContainer>
    )
}

type EditProfileFormProps = {
    user: User;
    onSuccess: () => void;
    variant?: "default" | "modal";
}