import { useNavigate } from "react-router";
import SignupForm from "../components/auth/SignupForm";

export default function Signup() {
    const navigate = useNavigate();

    return <SignupForm onSuccess={() => navigate("/")} />
}