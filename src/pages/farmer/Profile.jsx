import ProfileHeader from "@/components/profile/ProfileHeader";

import FarmProfileForm from "@/components/profile/ProfileForm";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

export default function Profile() {
  return (
    <section className="space-y-8 py-8">
      
      {/* Workspace Header */}
      <WorkspaceHeader
        title="Farm Profile"
        description="Manage your farm identity and marketplace presence."
      />

      {/* Profile Header */}
      <ProfileHeader />

      {/* Profile Form */}
      <FarmProfileForm />
    </section>
  );
}