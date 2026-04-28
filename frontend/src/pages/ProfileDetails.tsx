import { useState } from "react";
import defaultProfilePicture from "../assets/profile-default-picture.svg";
import PersonalDetails from "../components/PersonalDetails";
import EditProfileForm from "../components/EditProfileForm";
import ChangePassword from "../components/ChangePassword";
import NavigationTabs, { type NavigationTabType } from "../components/NavigationTabs";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../components/ErrorBlock";
import ProfileAvatar from "../components/ProfileAvatar";
import usersService from "../services/usersService";
import { useNavigate } from "react-router";
import PageContainer from "../components/layout/PageContainer";
import SkeletonProfileDetails from "../components/skeleton/SkeletonProfileDetails";

export function Component() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState<NavigationTabType>("overview");

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: usersService.getProfile,
  });

  if (isLoading) {
    return (
      <PageContainer>
        <SkeletonProfileDetails />
      </PageContainer>
    )
  }

  if (!user) {
    return (
      <ErrorBlock
        title="No user data"
        message="Something went wrong. Please try again."
      />
    )
  }

  if (isError) {
    return (
      <ErrorBlock
        title="An error occured"
        message={error.message || "Failed to fetch user"}
      />
    )
  }

  return (
    <PageContainer>
      <div className="p-6">
        <div className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-xl">
          {/* Profile Header */}
          <div className="pt-10 md:pt-14 pb-6 flex flex-col items-center space-y-4">
            <ProfileAvatar
              user={user}
              defaultProfilePicture={defaultProfilePicture}
            />

            <h2 className="text-4xl font-bold">{user.username}</h2>

            {/* Navigation Tabs */}
            <NavigationTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* CONTENT */}
          <div className="px-6 pb-10 md:pb-14">
            <div className="min-h-130">
              {/* PERSONAL DETAILS OVERVIEW */}
              {activeTab === "overview" && <PersonalDetails user={user} />}

              {/* EDIT PROFILE */}
              {activeTab === "edit" && <EditProfileForm user={user} onSuccess={() => navigate("/")} />}

              {/* CHANGE PASSWORD */}
              {activeTab === "password" && <ChangePassword />}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}