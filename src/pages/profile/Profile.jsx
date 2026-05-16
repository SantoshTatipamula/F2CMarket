import { useAuth } from "@/context/AuthContext";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import ProfileHeader from "@/components/profile/ProfileHeader";

import FarmProfileForm from "@/components/profile/ProfileForm";

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="space-y-8 py-8">
      
      <WorkspaceHeader
        title="My Profile"
        description="Manage your account and marketplace identity."
      />

      <ProfileHeader />

      {/* Farmer Profile */}
      {user?.role === "farmer" && (
        <FarmProfileForm />
      )}
    </section>
  );
}