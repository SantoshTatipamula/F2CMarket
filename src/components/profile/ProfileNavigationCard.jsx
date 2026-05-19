import {
  Settings2,
  Shield,
  Bell,
  History,
  Package,
  Star,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

export default function ProfileNavigationCard() {
  const { user } = useAuth();

  const isFarmer = user?.role === "farmer";

  const isConsumer = user?.role === "consumer";

  const isAdmin = user?.role === "admin";

  return (
    <ProfileCard>
      <ProfileCardHeader
        title="Profile Navigation"
        description="Manage your account, marketplace identity, and preferences."
      />

      <div className="mt-8 space-y-4">
        {/* Common */}
        <NavigationRow
          icon={Settings2}
          title="Profile Settings"
          description="Manage account preferences and marketplace settings."
          to="/profile/settings"
        />

        <NavigationRow
          icon={Shield}
          title="Security"
          description="Manage password and account protection."
          to="/profile/security"
        />

        <NavigationRow
          icon={Bell}
          title="Notifications"
          description="Manage notification and communication preferences."
          to="/profile/notifications"
        />

        <NavigationRow
          icon={History}
          title="Activity History"
          description="View your recent marketplace activity and actions."
          to="/profile/activity"
        />

        {/* Farmer */}
        {isFarmer && (
          <>
            <NavigationRow
              icon={Package}
              title="Seller Products"
              description="Manage your public marketplace products."
              to="/profile/seller-products"
            />

            <NavigationRow
              icon={Star}
              title="Seller Reviews"
              description="View customer reviews and marketplace feedback."
              to="/profile/seller-reviews"
            />

            <NavigationRow
              icon={Package}
              title="Farmer Orders"
              description="Manage incoming marketplace orders."
              to="/farmer/orders"
            />
          </>
        )}

        {/* Admin */}
        {isAdmin && (
          <>
            <NavigationRow
              icon={Package}
              title="Admin Dashboard"
              description="Access platform management and marketplace controls."
              to="/admin/dashboard"
            />

            <NavigationRow
              icon={Star}
              title="Platform Analytics"
              description="View marketplace growth and platform reports."
              to="/admin/analytics"
            />
          </>
        )}
      </div>
    </ProfileCard>
  );
}

/* Navigation Row */
function NavigationRow({ icon: Icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="
        flex items-center justify-between
        rounded-2xl
        border border-black/5
        bg-[var(--surface-2)]
        p-5
        transition-all duration-300
        hover:border-[var(--primary)]/20
        hover:bg-[var(--primary)]/5
      "
    >
      <div className="flex items-start gap-4">
        <div
          className="
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            bg-[var(--primary)]/10
            text-[var(--primary)]
          "
        >
          <Icon size={22} />
        </div>

        <div>
          <h3
            className="
              text-base font-semibold
              text-[var(--text-primary)]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-2
              max-w-xl
              text-sm leading-relaxed
              text-[var(--text-secondary)]
            "
          >
            {description}
          </p>
        </div>
      </div>

      <ChevronRight
        size={20}
        className="
          shrink-0
          text-[var(--text-secondary)]
        "
      />
    </Link>
  );
}
