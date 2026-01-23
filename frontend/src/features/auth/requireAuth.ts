import { redirect, type LoaderFunctionArgs } from "react-router";

export function requireAuth({ request }: LoaderFunctionArgs): void {
    const token = localStorage.getItem("token");

    if (!token) {
        // The URL the user attempted to access
        const url = new URL(request.url);
        const redirectTo = url.pathname + url.search;

        throw redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`);
    }
}