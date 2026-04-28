import PageContainer from "../components/layout/PageContainer";
import MainCenterColumn from "../components/MainCenterColumn";
import Posts from "../components/Posts";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import ShareSomethingCard from "../components/ShareSomethingCard";
import { useAuth } from "../store/auth/useAuth";
import PageContent from "../components/PageContent";

export function Component() {
    const { user } = useAuth();

    return (
        <PageContainer>
            <PageContent className="relative grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
                <Sidebar>
                    {user && <ProfileCard />}
                </Sidebar>
                <MainCenterColumn>
                    <ShareSomethingCard />
                    <Posts />
                </MainCenterColumn>
            </PageContent>
        </PageContainer>
    )
}