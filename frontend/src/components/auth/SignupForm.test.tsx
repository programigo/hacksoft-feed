import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignupForm from "./SignupForm";

// Mock auth hook
const signupMock = vi.fn().mockResolvedValue(undefined);

vi.mock("../../store/auth/useAuth", () => ({
    useAuth: () => ({
        loading: false,
        signup: signupMock,
    }),
}));

describe("SignupForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("submits signup data and calls onSuccess", async () => {
        const onSuccess = vi.fn();
        const user = userEvent.setup();

        render(<SignupForm onSuccess={onSuccess} />);

        await user.type(screen.getByLabelText(/username/i), "newuser");
        await user.type(screen.getByLabelText(/^password$/i), "Testp@ss1");
        await user.type(screen.getByLabelText(/confirm password/i), "Testp@ss1");
        await user.type(screen.getByLabelText(/email/i), "newuser@example.com");
        await user.type(screen.getByLabelText(/first name/i), "New");
        await user.type(screen.getByLabelText(/last name/i), "User");
        await user.type(screen.getByLabelText(/job title/i), "Engineer");

        await user.click(screen.getByRole("button", { name: /sign up/i }));

        expect(signupMock).toHaveBeenCalledTimes(1);
        expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it("does not submit when fields are empty", async () => {
        const onSuccess = vi.fn();
        const user = userEvent.setup();

        render(<SignupForm onSuccess={onSuccess} />);

        await user.click(screen.getByRole("button", { name: /sign up/i }));

        expect(signupMock).not.toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();

        // Assert at least one schema error is visible
        expect(screen.getByText(/minimum 3 characters/i)).toBeInTheDocument();
    });
});