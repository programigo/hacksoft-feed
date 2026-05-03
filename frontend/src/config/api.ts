const DEFAULT_API_BASE_URL = "http://localhost:5001/api";

/**
 * Frontend env vars (Vite):
 * - Must be prefixed with `VITE_` to be exposed to the client bundle.
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, "") ||
  DEFAULT_API_BASE_URL;