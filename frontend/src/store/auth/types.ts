export type User = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    profilePicture?: string | null;
}

export type LoginData = {
    username: string;
    password: string;
}

export type AuthContextType = {
    user: User | undefined;
    error: string | undefined;
    loading: boolean;

    login: (loginData: LoginData) => Promise<void>;
    signup: (signupData: FormData) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}