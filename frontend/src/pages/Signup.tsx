import { useNavigate } from "react-router";
import SignupForm from "../components/auth/SignupForm";
import PageContainer from "../components/layout/PageContainer";

export function Component() {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <SignupForm onSuccess={() => navigate("/")} />
        </PageContainer>
    )
}