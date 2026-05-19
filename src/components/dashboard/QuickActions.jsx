import {
  UserCog,
  ShoppingBag,
  Bell,
  ShieldCheck,
  Package,
  BarChart3,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import ActionCard from "@/components/dashboard/shared/DashboardActionButton";

export default function QuickActions() {
  const { user } = useAuth();

  const isFarmer =
    user?.role === "farmer";

  const actions = [
    {
      title: "Edit Profile",
      description:
        "Update your personal account information.",
      icon: UserCog,
      href: "/profile/edit",
    },

    {
      title: "Orders",
      description:
        "Track and manage your marketplace orders.",
      icon: ShoppingBag,
      href: "/orders",
    },

    {
      title: "Notifications",
      description:
        "View platform alerts and updates.",
      icon: Bell,
      href: "/profile/notifications",
    },

    {
      title: "Security",
      description:
        "Manage account security and privacy.",
      icon: ShieldCheck,
      href: "/profile/security",
    },
  ];

  // Farmer-only actions
  if (isFarmer) {
    actions.push(
      {
        title: "Manage Products",
        description:
          "Update your marketplace inventory.",
        icon: Package,
        href: "/farmer/products",
      },

      {
        title: "Analytics",
        description:
          "Monitor marketplace performance.",
        icon: BarChart3,
        href: "/farmer/analytics",
      }
    );
  }

  return (
    <section className="space-y-5">
      
      {/* Header */}
      <div>
        <h2
          className="
            text-2xl font-bold
            tracking-tight
            text-[var(--text-primary)]
          "
        >
          Quick Actions
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-[var(--text-secondary)]
          "
        >
          Quickly access your most-used
          workspace tools and settings.
        </p>
      </div>

      {/* Actions Grid */}
      <div
        className="
          grid grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {actions.map((action) => (
          <ActionCard
            key={action.title}
            {...action}
          />
        ))}
      </div>
    </section>
  );
}