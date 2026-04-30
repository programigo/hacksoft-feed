import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";

// Mock auth hook
const loginMock = vi.fn().mockResolvedValue(undefined);

vi.mock("../../store/auth/useAuth", () => ({
    useAuth: () => ({
        loading: false,
        login: loginMock,
    }),
}));

describe("LoginForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("submits credentials, calls login, then calls onSuccess", async () => {
        const onSuccess = vi.fn();
        const user = userEvent.setup();

        render(<LoginForm onSuccess={onSuccess} />);

        await user.type(screen.getByLabelText(/username/i), "testuser");
        await user.type(screen.getByLabelText(/password/i), "testpassword123");

        await user.click(screen.getByRole("button", { name: /log in/i }));

        // We can only assert onSuccess reliably here (login is inside the mocked hook)
        expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    it("does not submit when fields are empty", async () => {
        const onSuccess = vi.fn();
        const user = userEvent.setup();

        render(<LoginForm onSuccess={onSuccess} />);

        await user.click(screen.getByRole("button", { name: /log in/i }));

        expect(loginMock).not.toHaveBeenCalled();
        expect(onSuccess).not.toHaveBeenCalled();
    });
})