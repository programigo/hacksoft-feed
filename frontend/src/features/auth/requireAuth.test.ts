import { describe, it, expect, beforeEach } from "vitest";
import { requireAuth } from "./requireAuth";

describe("requireAuth", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("throws a redirect to /login when token is missing", () => {
        const request = new Request("http://localhost/users/me");

        expect(() => requireAuth({ request, params: {}, context: {} } as any)).toThrow();
    });

    it("does not throw when token exists", () => {
        localStorage.setItem("token", "x");
        const request = new Request("http://localhost/users/me");

        expect(() => requireAuth({ request, params: {}, context: {} } as any)).not.toThrow();
    });

    it("redirects to /login with ?redirect=... including attempted path", () => {
        localStorage.removeItem("token");

        try {
            requireAuth({ request: new Request("http://localhost/users/me?tab=overview") } as any);
            throw new Error("Expected requireAuth to redirect");
        } catch (e: any) {
            // react-router redirect throws a Response
            expect(e).toBeInstanceOf(Response);
            expect(e.status).toBe(302);

            const location = e.headers.get("Location");
            expect(location).toMatch(/^\/login\?redirect=/);

            // decoded redirect should include original path + query
            const redirectParam = new URLSearchParams(location!.split("?")[1]).get("redirect");
            expect(decodeURIComponent(redirectParam!)).toBe("/users/me?tab=overview");
        }
    });
});