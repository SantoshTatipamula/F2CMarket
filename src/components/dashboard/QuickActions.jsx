import {
  UserCog, ShoppingBag, Bell,
  ShieldCheck, Package, BarChart3,
  Users, LayoutDashboard, Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ActionCard from "@/components/dashboard/shared/DashboardActionButton";

export default function QuickActions() {
  const { user } = useAuth();
  const role = user?.role;

  const actionsByRole = {
    farmer: [
      { title: "Edit Profile",      icon: UserCog,       href: "/profile/edit"       },
      { title: "My Orders",         icon: ShoppingBag,   href: "/farmer/orders"      },
      { title: "Notifications",     icon: Bell,          href: "/profile/notifications" },
      { title: "Security",          icon: ShieldCheck,   href: "/profile/security"   },
      { title: "Manage Products",   icon: Package,       href: "/farmer/products"    },
      { title: "Analytics",         icon: BarChart3,     href: "/farmer/analytics"   },
    ],
    consumer: [
      { title: "Edit Profile",      icon: UserCog,       href: "/profile/edit"       },
      { title: "My Orders",         icon: ShoppingBag,   href: "/orders"             },
      { title: "Notifications",     icon: Bell,          href: "/profile/notifications" },
      { title: "Security",          icon: ShieldCheck,   href: "/profile/security"   },
    ],
    admin: [
      { title: "Dashboard",         icon: LayoutDashboard, href: "/admin/dashboard"  },
      { title: "Manage Users",      icon: Users,           href: "/admin/users"      },
      { title: "Manage Farmers",    icon: Package,         href: "/admin/farmers"    },
      { title: "Manage Products",   icon: Package,         href: "/admin/products"   },
      { title: "Notifications",     icon: Bell,            href: "/profile/notifications" },
      { title: "Settings",          icon: Settings,        href: "/profile/settings" },
    ],
  };

  const actions = actionsByRole[role] || actionsByRole.consumer;

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Quick Actions
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Quickly access your most-used workspace tools and settings.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3">
        {actions.map((action) => (
          <ActionCard key={action.title} {...action} />
        ))}
      </div>
    </section>
  );
}
