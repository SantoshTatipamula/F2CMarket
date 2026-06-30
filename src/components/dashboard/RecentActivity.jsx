import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Package,
  Bell,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { useMemo, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getConsumerOrders, getFarmerOrders } from "@/services/orderService";
import { getNotifications } from "@/services/notificationService";
import ActivityItem from "@/components/dashboard/shared/DashboardActivityItem";
import ProfileSectionHeader from "@/components/profile/shared/ProfileSectionHeader";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default function RecentActivity() {
  const { user } = useAuth();
  const role = user?.role;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!user?.id) return;

      try {
        const data = await getNotifications(user.id);
        setNotifications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setNotifications([]);
      }
    };

    loadNotifications();
  }, [user]);

  const activities = useMemo(() => {
    if (!user?.id) return [];

    const items = [];

    const orders =
      role === "farmer" ? getFarmerOrders(user.id) : getConsumerOrders(user.id);

    orders.slice(0, 3).forEach((order) => {
      items.push({
        title: `Order #${order.id}`,
        description: `Status: ${order.orderStatus} · ₹${order.total}`,
        time: timeAgo(order.createdAt),
        icon: ShoppingBag,
        href: role === "farmer" ? "/farmer/orders" : "/orders",
      });
    });

    notifications.slice(0, 2).forEach((n) => {
      items.push({
        title: n.title,
        description: n.message,
        time: timeAgo(n.createdAt),
        icon: Bell,
        href: "/profile/notifications",
      });
    });

    return items.slice(0, 5);
  }, [user, role, notifications]);

  /* Fallback static activities when no real data */
  const displayActivities =
    activities.length > 0
      ? activities
      : [
          {
            title: "Welcome to F2CMARKET!",
            description: "Your account is set up and ready to use.",
            time: "Just now",
            icon: ShieldCheck,
            href: "/profile",
          },
          {
            title: "Browse fresh products",
            description: "Discover produce from local verified farmers.",
            time: "",
            icon: Package,
            href: "/products",
          },
          {
            title: "Complete your profile",
            description: "Add your details for a better experience.",
            time: "",
            icon: ShieldCheck,
            href: "/profile/edit",
          },
        ];

  const viewAllHref =
    role === "farmer"
      ? "/farmer/orders"
      : role === "admin"
        ? "/admin/dashboard"
        : "/orders";

  return (
    <section className="rounded-3xl border border-black/5 bg-[var(--surface)] p-6 shadow-sm">
      <ProfileSectionHeader
        title="Recent Activity"
        description="Track your latest marketplace actions and engagement."
      />

      <div className="mt-8 space-y-5">
        {displayActivities.map((activity, index) =>
          activity.href ? (
            <Link
              key={index}
              to={activity.href}
              className="block hover:opacity-80 transition"
            >
              <ActivityItem {...activity} />
            </Link>
          ) : (
            <ActivityItem key={index} {...activity} />
          ),
        )}
      </div>

      <div className="flex justify-center pt-2">
        <Link
          to={viewAllHref}
          className="inline-flex items-center gap-2 justify-center rounded-2xl border border-black/5 bg-[var(--surface-2)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]"
        >
          View All <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
