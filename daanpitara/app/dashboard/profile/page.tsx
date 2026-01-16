
import { getUserProfileData } from "@/actions/get-user-profile";
import ProfileClient from "@/components/dashboard/ProfileClient";

export default async function ProfilePage() {
  const userData = await getUserProfileData();

  const initialData = {
    phone: userData?.phoneNumber || null,
    location: userData?.location || null,
    bio: userData?.bio || null,
  };

  return <ProfileClient initialData={initialData} />;
}
