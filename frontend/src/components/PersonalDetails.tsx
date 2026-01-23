import type { User } from "../types/users";
import ContentContainer from "./layout/ContentContainer";

export default function PersonalDetails({ user }: PersonalDetailsProps) {
    return (
        <ContentContainer>
            <h3 className="text-2xl font-semibold text-center">Your Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="p-4 bg-base-200 rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#FD7500]">Username</h4>
                    <p className="text-lg mt-1">{user.username}</p>
                </div>

                <div className="p-4 bg-base-200 rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#FD7500]">Email</h4>
                    <p className="text-lg mt-1">{user.email}</p>
                </div>

                <div className="p-4 bg-base-200 rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#FD7500]">First Name</h4>
                    <p className="text-lg mt-1">{user.firstName}</p>
                </div>

                <div className="p-4 bg-base-200 rounded-xl shadow-sm">
                    <h4 className="font-bold text-[#FD7500]">Last Name</h4>
                    <p className="text-lg mt-1">{user.lastName}</p>
                </div>
            </div>
        </ContentContainer>
    )
}

type PersonalDetailsProps = {
    user: User;
}