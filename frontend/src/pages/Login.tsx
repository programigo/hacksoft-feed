import LoginForm from "../components/auth/LoginForm";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();

    return <LoginForm onSuccess={() => navigate("/")} />
}