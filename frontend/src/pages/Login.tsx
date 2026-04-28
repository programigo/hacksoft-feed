import LoginForm from "../components/auth/LoginForm";
import { useNavigate } from "react-router";
import PageContainer from "../components/layout/PageContainer";

export function Component() {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <LoginForm onSuccess={() => navigate("/")} />
        </PageContainer>
    )
}