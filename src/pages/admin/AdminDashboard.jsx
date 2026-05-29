import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Users, Sprout, Package, ShoppingCart, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getOrders } from "@/services/orderService";
import { getProducts } from "@/services/productService";
import Breadcrumb from "@/components/common/ui/Breadcrumb";

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
        <p className="text-sm text-[var(--text-muted)]">{label}</p>
        {sub && <p className="text-xs text-[var(--text-muted)] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { users } = useAuth();

  const stats = useMemo(() => {
    const allOrders   = getOrders();
    const allProducts = getProducts();
    const consumers   = users.filter((u) => u.role === "consumer");
    const farmers     = users.filter((u) => u.role === "farmer");
    const pending     = farmers.filter((f) => f.verificationStatus === "pending");
    return { allOrders, allProducts, consumers, farmers, pending };
  }, [users]);

  const recentOrders = getOrders().slice(0, 6);

  return (
    <section className="min-h-screen bg-[var(--surface)] py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Breadcrumb items={[{ label: "Admin Dashboard" }]} />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-1">Platform overview and management</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users}        label="Consumers"    value={stats.consumers.length}   color="bg-blue-500"   />
          <StatCard icon={Sprout}       label="Farmers"      value={stats.farmers.length}     sub={`${stats.pending.length} pending`} color="bg-green-600" />
          <StatCard icon={Package}      label="Products"     value={stats.allProducts.length} color="bg-purple-500" />
          <StatCard icon={ShoppingCart} label="Total Orders" value={stats.allOrders.length}   color="bg-orange-500" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <h2 className="font-bold text-[var(--text-primary)]">Recent Orders</h2>
              <Link to="/admin/products" className="text-xs text-[var(--primary)] font-medium">View all →</Link>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {recentOrders.length === 0
                ? <p className="text-sm text-[var(--text-muted)] px-5 py-8 text-center">No orders yet</p>
                : recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-5 py-3 text-sm">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">#{order.id}</p>
                      <p className="text-xs text-[var(--text-muted)]">{order.consumer?.name || "Customer"}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      order.orderStatus === "Delivered" ? "bg-green-100 text-green-700"
                      : order.orderStatus === "Cancelled" ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                    }`}>{order.orderStatus}</span>
                    <p className="font-bold text-[var(--primary)]">₹{order.total}</p>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="space-y-4">
            {stats.pending.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-amber-600" />
                  <h3 className="font-bold text-amber-900">Pending Verifications</h3>
                </div>
                <p className="text-3xl font-bold text-amber-700 mb-3">{stats.pending.length}</p>
                <Link to="/admin/farmers">
                  <button className="w-full h-9 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition">
                    Review Now →
                  </button>
                </Link>
              </div>
            )}

            <div className="bg-white border border-[var(--border)] rounded-2xl p-5 space-y-1">
              <h3 className="font-bold text-[var(--text-primary)] mb-3">Quick Actions</h3>
              {[
                { label: "Manage Users",    to: "/admin/users"    },
                { label: "Manage Farmers",  to: "/admin/farmers"  },
                { label: "Manage Products", to: "/admin/products" },
              ].map(({ label, to }) => (
                <Link key={to} to={to}
                  className="flex items-center px-3 py-2.5 rounded-xl hover:bg-[var(--surface)] transition text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] min-h-[44px]">
                  {label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
