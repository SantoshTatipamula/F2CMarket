import { useMemo } from "react";
import { IndianRupee, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { useAuth }         from "@/context/AuthContext";
import { useProducts }     from "@/context/ProductContext";
import { getFarmerOrders } from "@/services/orderService";
import AnalyticsStatCard   from "@/components/dashboard/analytics/AnalyticsStatCard";

export default function DashboardStats() {
  const { user } = useAuth();
  const { products } = useProducts();

  const stats = useMemo(() => {
    const myProducts = products.filter(
      p => String(p.farmerId || p.sellerId) === String(user?.id)
    );
    const myOrders   = user?.id ? getFarmerOrders(user.id) : [];
    const delivered  = myOrders.filter(o => o.orderStatus === "Delivered");
    const revenue    = delivered.reduce((s, o) =>
      s + (o.items || []).reduce((si, i) => si + (i.subtotal || 0), 0), 0);
    const customers  = [...new Set(myOrders.map(o => o.consumerId))].length;
    const pending    = myOrders.filter(o => o.orderStatus === "Pending").length;

    return [
      { title: "Total Revenue", value: `₹${revenue.toLocaleString("en-IN")}`, growth: `${delivered.length} delivered`, icon: IndianRupee },
      { title: "Orders",        value: String(myOrders.length),                growth: `${pending} pending`,           icon: ShoppingBag  },
      { title: "Customers",     value: String(customers),                      growth: "unique buyers",                icon: Users        },
      { title: "Products",      value: String(myProducts.length),              growth: "listed",                      icon: TrendingUp   },
    ];
  }, [user, products]);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <AnalyticsStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}