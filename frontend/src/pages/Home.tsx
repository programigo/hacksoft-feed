import Content from "../components/Content";
import PageContainer from "../components/layout/PageContainer";
import MainCenterColumn from "../components/MainCenterColumn";
import Posts from "../components/Posts";
import ProfileCard from "../components/ProfileCard";
import Sidebar from "../components/Sidebar";
import ShareSomethingCard from "../components/ShareSomethingCard";

export default function Home() {
    return (
        <PageContainer>
            <Content>
                <Sidebar>
                    <ProfileCard />
                </Sidebar>
                <MainCenterColumn>
                    <ShareSomethingCard />
                    <Posts />
                </MainCenterColumn>
            </Content>
        </PageContainer>
    )
}