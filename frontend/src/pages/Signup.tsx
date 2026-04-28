import { useNavigate } from "react-router";
import SignupForm from "../components/auth/SignupForm";
import PageContainer from "../components/layout/PageContainer";
import PageContent from "../components/PageContent";

export function Component() {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <PageContent>
                <SignupForm onSuccess={() => navigate("/")} />
            </PageContent>
        </PageContainer>
    )
}