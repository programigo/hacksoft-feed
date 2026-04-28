import { useEffect, useState, type ReactNode } from "react";
import userService from "../../services/usersService";
import authService from "../../services/authService";
import type { LoginData, User } from "./types";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
    children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | undefined>(undefined);

    const [token, setToken] = useState<string | undefined>(() => {
        return localStorage.getItem("token") ?? undefined;
    });

    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // Do not populate if user is already set
        if (!token || user) {
            return;
        }

        async function populateUser() {
            setLoading(true);

            try {
                const apiUser = await userService.getProfile();
                setUser(apiUser);
            } catch {
                setUser(undefined);
                setToken(undefined);

                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        }

        populateUser();
    }, [token, user]);

    async function login(loginData: LoginData) {
        setLoading(true);

        try {
            const res = await authService.login(loginData);

            setUser(res);
            setToken(res.token);

            localStorage.setItem("token", res.token);
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function signup(signupData: FormData) {
        setLoading(true);

        try {
            const res = await authService.signup(signupData);

            setUser(res);
            setToken(res.token);

            localStorage.setItem("token", res.token);
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }

    }

    function logout() {
        setUser(undefined);
        setToken(undefined);
        setError(undefined);
        setLoading(false);

        localStorage.removeItem("token");
    }

    function clearError() {
        setError(undefined);
    }

    const contextValue = {
        user,
        error,
        loading,
        login,
        signup,
        logout,
        clearError,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}