import Content from "../components/Content";
import PageContainer from "../components/layout/PageContainer";
import MainCenterColumn from "../components/MainCenterColumn";
import Posts from "../components/Posts";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import ShareSomethingCard from "../components/ShareSomethingCard";
import { useAuth } from "../store/auth/useAuth";

export default function Home() {
    const { user } = useAuth();

    return (
        <PageContainer>
            <Content>
                <Sidebar>
                    {user && <ProfileCard />}
                </Sidebar>
                <MainCenterColumn>
                    <ShareSomethingCard />
                    <Posts />
                </MainCenterColumn>
            </Content>
        </PageContainer>
    )
}