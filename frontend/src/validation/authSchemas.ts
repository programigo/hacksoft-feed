import { z } from "zod";

// Shared primitives
export const usernameSchema = z.string().min(3, "The username field is required (minimum 3 characters).");

export const firstNameSchema = z.string().min(2, "The first name field is required (minimum 2 characters).");

export const lastNameSchema = z.string().min(2, "The last name field is required (minimum 2 characters).");

export const jobTitleSchema = z.string().min(5, "The job title field is required (minimum 5 characters).");

export const confirmPasswordSchema = z.string();

export const solidPasswordSchema = z
    .string()
    .min(6, "You must provide a password with at least 6 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special symbol.");


// Forms
export const signupSchema = z.object({
    username: usernameSchema,
    email: z.email("Invalid email address."),
    password: solidPasswordSchema,
    confirmPassword: confirmPasswordSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    jobTitle: jobTitleSchema,
})
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match.",
        }
    );

export const loginSchema = z.object({
    username: usernameSchema,
    password: z.string().min(1, "The password field is required."),
});

export const editProfileSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "The current password field is required."),
    newPassword: solidPasswordSchema,
    confirmPassword: confirmPasswordSchema,
})
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match.",
        }
    );

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type EditProfileFormData = z.infer<typeof editProfileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;