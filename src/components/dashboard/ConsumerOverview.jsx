import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Package, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { getConsumerOrders } from "@/services/orderService";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";
import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

export default function ConsumerOverview() {
  const { user } = useAuth();

  const stats = useMemo(() => {
    const orders    = user?.id ? getConsumerOrders(user.id) : [];
    const pending   = orders.filter(o => o.orderStatus === "Pending").length;
    const delivered = orders.filter(o => o.orderStatus === "Delivered").length;
    const wishlist  = JSON.parse(localStorage.getItem("f2c-wishlist") || "[]");
    return { orders, pending, delivered, wishlist };
  }, [user]);

  const overview = [
    { label: "Total Orders",     value: String(stats.orders.length),    icon: ShoppingBag, href: "/orders"   },
    { label: "Pending Orders",   value: String(stats.pending),          icon: Package,     href: "/orders"   },
    { label: "Delivered",        value: String(stats.delivered),        icon: Package,     href: "/orders"   },
    { label: "Wishlist Items",   value: String(stats.wishlist.length),  icon: Heart,       href: "/wishlist" },
  ];

  return (
    <DashboardCard>
      <DashboardCardHeader
        title="My Overview"
        description="Track your orders, wishlist, and shopping activity."
      />

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {overview.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            to={href}
            className="rounded-2xl border border-black/5 bg-[var(--surface-2)] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-[var(--text-primary)]">{value}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--primary)]/10 bg-[var(--primary)]/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Browse Fresh Products</h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Discover fresh produce directly from verified local farmers near you.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-2xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
        >
          Shop Now <ArrowUpRight size={18} />
        </Link>
      </div>
    </DashboardCard>
  );
}
