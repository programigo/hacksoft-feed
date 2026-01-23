import { useState } from "react";
import defaultProfilePicture from "../assets/profile-default-picture.svg";
import PersonalDetails from "../components/PersonalDetails";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import NavigationTabs, { type NavigationTabType } from "../components/NavigationTabs";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../components/ErrorBlock";
import ProfileAvatar from "../components/ProfileAvatar";
//import SkeletonProfileDetails from "../components/skeleton/SkeletonProfileDetails";
import usersService from "../services/usersService";

export default function ProfileDetails() {
  const [activeTab, setActiveTab] =
    useState<NavigationTabType>("overview");

  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: usersService.getProfile,
  });

  if (isPending) {
    return null;
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
    <div className="min-h-screen flex justify-center p-6">
      <div className="w-full max-w-4xl bg-base-100 rounded-2xl shadow-xl pt-25 md:pt-32 pb-25 md:pb-32 space-y-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4">
          <ProfileAvatar
            user={user}
            defaultProfilePicture={defaultProfilePicture}
          />

          <h2 className="text-4xl font-bold">{user?.username}</h2>

          {/* Navigation Tabs */}
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* PERSONAL DETAILS OVERVIEW */}
        {activeTab === "overview" && <PersonalDetails user={user} />}

        {/* EDIT PROFILE */}
        {activeTab === "edit" && <EditProfile user={user} />}

        {/* CHANGE PASSWORD */}
        {activeTab === "password" && <ChangePassword />}
      </div>
    </div>
  );
}