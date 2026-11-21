"use client";

import { UpdateProfileForm } from "@/components/users/UpdateProfileForm";
import { useClientUserSession } from "@/lib/client-side-sessions";

const UpdateProfilePage = () => {
    const session = useClientUserSession();
    const user = session.data?.user;

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return <UpdateProfileForm user={user} />;
};

export default UpdateProfilePage;