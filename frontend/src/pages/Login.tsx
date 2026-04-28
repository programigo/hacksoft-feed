import LoginForm from "../components/auth/LoginForm";
import { useNavigate } from "react-router";
import PageContainer from "../components/layout/PageContainer";
import PageContent from "../components/PageContent";

export function Component() {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <PageContent>
                <LoginForm onSuccess={() => navigate("/")} />
            </PageContent>
        </PageContainer>
    )
}