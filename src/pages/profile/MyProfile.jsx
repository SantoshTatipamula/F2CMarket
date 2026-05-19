import ProfileHeader from "@/components/profile/ProfileHeader";

import AccountInformation from "@/components/profile/AccountInformation";

import ProfileCompletion from "@/components/profile/ProfileCompletion";

import ProfileNavigationCard from "@/components/profile/ProfileNavigationCard";

export default function MyProfile() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      
      <section
        className="
          mx-auto
          max-w-7xl
          px-4 py-8
          lg:px-8
        "
      >
        
        {/* Profile Hero */}
        <ProfileHeader />

        {/* Main Grid */}
<div
  className="
    mt-8
    grid grid-cols-1
    gap-8
    xl:grid-cols-[1.2fr_0.8fr]
  "
>
  
  {/* Account Info */}
  <AccountInformation />

  {/* Completion */}
  <ProfileCompletion />
</div>

{/* Navigation */}
<div className="mt-8">
  <ProfileNavigationCard />
</div>
      </section>
    </main>
  );
}