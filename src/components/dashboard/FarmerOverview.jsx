import { Link } from "react-router-dom";
import { ArrowUpRight, Package, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react";
import { useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useProducts } from "@/context/ProductContext";
import { getFarmerOrders } from "@/services/orderService";
import DashboardCard from "@/components/dashboard/shared/DashboardCard";
import DashboardCardHeader from "@/components/dashboard/shared/DashboardCardHeader";

export default function FarmerOverview() {
  const { user } = useAuth();
  const { products } = useProducts();

  const stats = useMemo(() => {
    const myProducts  = products.filter(p => String(p.farmerId || p.sellerId) === String(user?.id));
    const myOrders    = user?.id ? getFarmerOrders(user.id) : [];
    const pending     = myOrders.filter(o => o.orderStatus === "Pending").length;
    const lowStock    = myProducts.filter(p => (p.stock ?? 999) < 10).length;
    const topProduct = [...myProducts]
  .sort(
    (a, b) => (b.totalOrders || 0) - (a.totalOrders || 0)
  )[0];

    return { myProducts, myOrders, pending, lowStock, topProduct };
  }, [user, products]);

  const overview = [
    { label: "Active Products",  value: String(stats.myProducts.length), icon: Package,       href: "/farmer/products"  },
    { label: "Pending Orders",   value: String(stats.pending),           icon: ShoppingCart,  href: "/farmer/orders"    },
    { label: "Total Orders",     value: String(stats.myOrders.length),   icon: TrendingUp,    href: "/farmer/orders"    },
    { label: "Low Stock Alerts", value: String(stats.lowStock),          icon: AlertTriangle, href: "/farmer/products"  },
  ];

  return (
    <DashboardCard>
      <DashboardCardHeader
        title="Farmer Overview"
        description="Monitor your marketplace performance, product activity, and operational growth."
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

      {/* Bottom summary */}
      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[var(--primary)]/10 bg-[var(--primary)]/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-[var(--text-primary)]">
            {stats.topProduct ? stats.topProduct.name : "No products yet"}
          </h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {stats.topProduct
              ? "Your top performing product. View analytics for detailed insights."
              : "Add your first product to start selling on F2CMARKET."}
          </p>
        </div>
        <Link
          to={stats.topProduct ? "/farmer/analytics" : "/farmer/products/add"}
          className="inline-flex items-center gap-2 rounded-2xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 whitespace-nowrap"
        >
          {stats.topProduct ? "View Insights" : "Add Product"}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </DashboardCard>
  );
}