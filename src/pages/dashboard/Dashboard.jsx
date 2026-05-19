import { useAuth } from "@/context/AuthContext";
import QuickActions from "@/components/dashboard/QuickActions";

import RecentActivity from "@/components/dashboard/RecentActivity";
import SettingsMenu from "@/components/dashboard/SettingsMenu";

import SellerTrustCard from "@/components/farmer/profile/SellerTrustCard";
import VerificationSection from "@/components/farmer/profile/VerificationSection";
import PublicProductsPreview from "@/components/farmer/profile/PublicProductsPreview";
import ReviewPreview from "@/components/farmer/profile/ReviewPreview";

export default function Dashboard() {
  const { user } = useAuth();

  const isFarmer =
    user?.role === "farmer";

  return (
<main className="min-h-screen bg-[var(--bg)]">
  
  <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">

    {/* Quick Actions */}
    <div className="mt-8">
      <QuickActions />
    </div>

    {/* Trust + Verification */}
    <div
      className="
        mt-8
        grid grid-cols-1
        gap-8
        xl:grid-cols-2
      "
    >
      <SellerTrustCard />

      <VerificationSection />
    </div>

    {/* Products */}
    <div className="mt-8">
      <PublicProductsPreview />
    </div>

    {/* Activity + Reviews */}
    <div
      className="
        mt-8
        grid grid-cols-1
        gap-8
        xl:grid-cols-2
      "
    >
      <RecentActivity />

      <ReviewPreview />
    </div>
  </section>
</main>
  );
}