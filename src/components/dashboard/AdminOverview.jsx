import { Link } from "react-router-dom";
import { Users, Sprout, Package, ShoppingCart, ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { getOrders } from "@/services/orderService";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";
import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

export default function AdminOverview() {
  const { users } = useAuth();
  const { products: allProducts } = useProducts();

  const stats = useMemo(() => {
    const allOrders   = getOrders();
    const consumers   = (users || []).filter(u => u.role === "consumer");
    const farmers     = (users || []).filter(u => u.role === "farmer");
    const pending     = farmers.filter(f => f.verificationStatus === "pending");
    return { allOrders, allProducts, consumers, farmers, pending };
  }, [users, allProducts]);

  const overview = [
    { label: "Consumers",           value: String(stats.consumers.length),   icon: Users,        href: "/admin/users"    },
    { label: "Farmers",             value: String(stats.farmers.length),     icon: Sprout,       href: "/admin/farmers"  },
    { label: "Products",            value: String(stats.allProducts.length), icon: Package,      href: "/admin/products" },
    { label: "Total Orders",        value: String(stats.allOrders.length),   icon: ShoppingCart, href: "/admin/dashboard"},
  ];

  return (
    <DashboardCard>
      <DashboardCardHeader
        title="Platform Overview"
        description="Monitor marketplace activity, users, and pending verifications."
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

      {stats.pending.length > 0 && (
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-amber-900">
              {stats.pending.length} Farmer{stats.pending.length > 1 ? "s" : ""} Pending Verification
            </h3>
            <p className="mt-2 text-sm text-amber-700">
              Review and approve farmer applications to get them selling on the platform.
            </p>
          </div>
          <Link
            to="/admin/farmers"
            className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition-all whitespace-nowrap"
          >
            Review Now <ArrowUpRight size={18} />
          </Link>
        </div>
      )}
    </DashboardCard>
  );
}