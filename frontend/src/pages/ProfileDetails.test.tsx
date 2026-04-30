import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Component as ProfileDetails } from "./ProfileDetails";

vi.mock("react-router", () => ({
    useNavigate: () => vi.fn(),
}));

let mockUseQueryReturn: any;

vi.mock("@tanstack/react-query", () => ({
    useQuery: () => mockUseQueryReturn,
}));

describe("ProfileDetails", () => {
    it("renders ErrorBlock on query failure", () => {
        mockUseQueryReturn = {
            data: undefined,
            isLoading: false,
            isError: true,
            error: new Error("Network failed"),
        };

        render(<ProfileDetails />);

        expect(screen.getByText(/an error occured/i)).toBeInTheDocument();
        expect(screen.getByText(/network failed/i)).toBeInTheDocument();
    });

    it("renders SkeletonProfileDetails while loading", () => {
        mockUseQueryReturn = {
            data: undefined,
            isLoading: true,
            isError: false,
            error: null,
        };

        const { container } = render(<ProfileDetails />);

        // SkeletonBox sets aria-hidden="true" and class "shimmer"
        const skeletonNodes = container.querySelectorAll('[aria-hidden="true"].shimmer');

        expect(skeletonNodes.length).toBeGreaterThan(0);
    });

    it("success state renders username", () => {
        mockUseQueryReturn = {
            data: { username: "test_user123" },
            isLoading: false,
            isError: false,
            error: null,
        };

        render(<ProfileDetails />);

        expect(screen.getByRole("heading", { level: 2, name: "test_user123" })).toBeInTheDocument();
    });
});