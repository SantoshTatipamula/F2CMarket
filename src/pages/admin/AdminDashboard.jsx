import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Users, Sprout, Package, ShoppingCart,
  TrendingUp, Clock, CheckCircle2, XCircle,
  ArrowUpRight, IndianRupee, BarChart3,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  CartesianGrid, XAxis, YAxis, Tooltip, Legend,
} from "recharts";

import { useAuth }      from "@/context/AuthContext";
import { useProducts }  from "@/context/ProductContext";
import { getOrders }    from "@/services/orderService";
import Breadcrumb       from "@/components/common/ui/Breadcrumb";

/* ── Helpers ─────────────────────────────────────────────────────── */
function monthLabel(iso) {
  return new Date(iso).toLocaleString("en-IN", { month: "short" });
}

function groupByMonth(items, valueKey) {
  const map = {};
  items.forEach((item) => {
    const m = monthLabel(item.createdAt);
    map[m] = (map[m] || 0) + (valueKey ? (item[valueKey] || 0) : 1);
  });
  return Object.entries(map).map(([month, value]) => ({ month, value }));
}

/* ── Stat Card ───────────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, sub, color, href }) {
  const content = (
    <div className={`bg-white border border-[var(--border)] rounded-2xl p-5 flex items-center gap-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${href ? "cursor-pointer" : ""}`}>
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
        <p className="text-sm text-[var(--text-muted)]">{label}</p>
        {sub && <p className="text-xs text-green-600 font-medium mt-0.5">{sub}</p>}
      </div>
      {href && <ArrowUpRight size={16} className="text-[var(--text-muted)] shrink-0" />}
    </div>
  );
  return href ? <Link to={href}>{content}</Link> : content;
}

/* ── Section wrapper ─────────────────────────────────────────────── */
function ChartCard({ title, subtitle, children, action }) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="font-bold text-[var(--text-primary)]">{title}</h3>
          {subtitle && <p className="text-xs text-[var(--text-muted)] mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

const COLORS = ["#16A34A", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

/* ── Main ────────────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const { users } = useAuth();
  const { products: allProducts } = useProducts();

  const data = useMemo(() => {
    const allOrders   = getOrders();
    const consumers   = users.filter((u) => u.role === "consumer");
    const farmers     = users.filter((u) => u.role === "farmer");
    const pending     = farmers.filter((f) => f.verificationStatus === "pending");
    const approved    = farmers.filter((f) => f.verificationStatus === "approved");
    const rejected    = farmers.filter((f) => f.verificationStatus === "rejected");

    const delivered   = allOrders.filter((o) => o.orderStatus === "Delivered");
    const cancelled   = allOrders.filter((o) => o.orderStatus === "Cancelled");
    const revenue     = delivered.reduce((s, o) => s + (o.total || 0), 0);

    /* Revenue by month */
    const revenueByMonth = groupByMonth(delivered, "total");

    /* Orders by month */
    const ordersByMonth = groupByMonth(allOrders);

    /* Orders by status for pie */
    const statusMap = {};
    allOrders.forEach(o => { statusMap[o.orderStatus] = (statusMap[o.orderStatus] || 0) + 1; });
    const ordersByStatus = Object.entries(statusMap).map(([name, value]) => ({ name, value }));

    /* Top products by order count */
    const productOrderMap = {};
    allOrders.forEach(o =>
      (o.items || []).forEach(item => {
        const key = item.name || "Unknown";
        productOrderMap[key] = (productOrderMap[key] || 0) + item.quantity;
      })
    );
    const topProducts = Object.entries(productOrderMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, orders]) => ({ name, orders }));

    /* User growth by month */
    const userGrowth = groupByMonth(
      [...consumers, ...farmers].filter(u => u.createdAt)
    );

    /* Category breakdown */
    const catMap = {};
    allProducts.forEach(p => {
      const c = p.category || "Other";
      catMap[c] = (catMap[c] || 0) + 1;
    });
    const categoryData = Object.entries(catMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return {
      allOrders, allProducts, consumers, farmers,
      pending, approved, rejected,
      delivered, cancelled, revenue,
      revenueByMonth, ordersByMonth, ordersByStatus,
      topProducts, userGrowth, categoryData,
    };
  }, [users, allProducts]);

  const recentOrders = getOrders().slice(0, 8);

  return (
    <section className="min-h-screen bg-[var(--surface)] py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">

        {/* Breadcrumb + Header */}
        <div>
          <Breadcrumb items={[{ label: "Admin Dashboard" }]} />
          <div className="flex items-center justify-between flex-wrap gap-4 mt-2">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)]">Admin Dashboard</h1>
              <p className="text-[var(--text-secondary)] mt-1">
                Full platform overview — users, orders, revenue and more.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/admin/farmers"
                className="flex items-center gap-2 h-10 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition">
                <Clock size={15} /> {data.pending.length} Pending
              </Link>
              <Link to="/admin/products"
                className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold transition">
                <BarChart3 size={15} /> Reports
              </Link>
            </div>
          </div>
        </div>

        {/* ── Stat Cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={IndianRupee} label="Total Revenue"  value={`₹${data.revenue.toLocaleString("en-IN")}`} sub="from delivered orders" color="bg-green-600"  href="/admin/products" />
          <StatCard icon={ShoppingCart} label="Total Orders"  value={data.allOrders.length}   sub={`${data.delivered.length} delivered`}  color="bg-blue-500"   href="/admin/products" />
          <StatCard icon={Users}        label="Consumers"     value={data.consumers.length}   sub="registered users"                       color="bg-purple-500" href="/admin/users"    />
          <StatCard icon={Sprout}       label="Farmers"       value={data.farmers.length}     sub={`${data.pending.length} pending`}       color="bg-orange-500" href="/admin/farmers"  />
        </div>

        {/* ── Second row stats ────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Package}      label="Total Products"    value={data.allProducts.length}   color="bg-teal-500"  href="/admin/products" />
          <StatCard icon={CheckCircle2} label="Approved Farmers"  value={data.approved.length}      color="bg-green-500" href="/admin/farmers"  />
          <StatCard icon={Clock}        label="Pending Farmers"   value={data.pending.length}       color="bg-amber-500" href="/admin/farmers"  />
          <StatCard icon={XCircle}      label="Cancelled Orders"  value={data.cancelled.length}     color="bg-red-500"   href="/admin/products" />
        </div>

        {/* ── Charts Row 1 ────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Revenue trend — area chart */}
          <div className="lg:col-span-2">
            <ChartCard title="Revenue Trend" subtitle="Monthly revenue from delivered orders">
              {data.revenueByMonth.length === 0 ? (
                <div className="h-56 flex items-center justify-center text-sm text-[var(--text-muted)]">
                  No revenue data yet. Revenue appears when orders are delivered.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={data.revenueByMonth}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#16A34A" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#16A34A" stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${v}`} />
                    <Tooltip formatter={v => [`₹${v}`, "Revenue"]} />
                    <Area type="monotone" dataKey="value" stroke="#16A34A" strokeWidth={2} fill="url(#revGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </ChartCard>
          </div>

          {/* Orders by status — pie chart */}
          <ChartCard title="Orders by Status" subtitle="Current order distribution">
            {data.ordersByStatus.length === 0 ? (
              <div className="h-56 flex items-center justify-center text-sm text-[var(--text-muted)]">No orders yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={data.ordersByStatus} dataKey="value" nameKey="name"
                    cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    } labelLine={false}>
                    {data.ordersByStatus.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* ── Charts Row 2 ────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Orders per month */}
          <ChartCard title="Order Volume" subtitle="Number of orders placed each month">
            {data.ordersByMonth.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-sm text-[var(--text-muted)]">No orders yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.ordersByMonth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" name="Orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          {/* User growth */}
          <ChartCard title="User Growth" subtitle="New users registered each month">
            {data.userGrowth.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-sm text-[var(--text-muted)]">No user data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" name="Users" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* ── Charts Row 3 ────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Top products */}
          <ChartCard title="Top Products by Orders" subtitle="Most ordered products on the platform">
            {data.topProducts.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-sm text-[var(--text-muted)]">No order data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.topProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={90} />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#16A34A" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          {/* Product categories */}
          <ChartCard title="Products by Category" subtitle="Distribution of products across categories">
            {data.categoryData.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-sm text-[var(--text-muted)]">No products yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={data.categoryData} dataKey="value" nameKey="name"
                    cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                    {data.categoryData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" iconSize={10} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* ── Bottom Row — Recent orders + Pending farmers ─────────── */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent orders table */}
          <div className="lg:col-span-2 bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <div>
                <h3 className="font-bold text-[var(--text-primary)]">Recent Orders</h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Latest marketplace transactions</p>
              </div>
              <Link to="/admin/products" className="text-xs text-[var(--primary)] font-semibold hover:underline">
                View all →
              </Link>
            </div>
            <div className="overflow-x-auto">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] px-5 py-10 text-center">
                  No orders yet. Orders will appear here once consumers start purchasing.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                      {["Order ID", "Customer", "Total", "Payment", "Status"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-secondary)] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-[var(--surface)] transition">
                        <td className="px-4 py-3 font-mono text-xs text-[var(--text-muted)]">#{order.id?.slice(-6)}</td>
                        <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{order.consumer?.name || "—"}</td>
                        <td className="px-4 py-3 font-bold text-[var(--primary)]">₹{order.total}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${order.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>{order.paymentStatus || "Pending"}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" : order.orderStatus === "Cancelled" ? "bg-red-100 text-red-700" : order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>{order.orderStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Pending farmers + Quick links */}
          <div className="space-y-4">

            {/* Pending verifications */}
            <div className={`rounded-2xl p-5 border ${
              data.pending.length > 0
                ? "bg-amber-50 border-amber-200"
                : "bg-green-50 border-green-200"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {data.pending.length > 0
                  ? <Clock size={17} className="text-amber-600" />
                  : <CheckCircle2 size={17} className="text-green-600" />
                }
                <h3 className={`font-bold text-sm ${data.pending.length > 0 ? "text-amber-900" : "text-green-900"}`}>
                  {data.pending.length > 0 ? "Pending Verifications" : "All Verified"}
                </h3>
              </div>
              <p className={`text-3xl font-bold mb-3 ${data.pending.length > 0 ? "text-amber-700" : "text-green-700"}`}>
                {data.pending.length}
              </p>
              <Link to="/admin/farmers">
                <button className={`w-full h-9 rounded-xl text-white text-sm font-semibold transition ${
                  data.pending.length > 0
                    ? "bg-amber-500 hover:bg-amber-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}>
                  {data.pending.length > 0 ? "Review Now →" : "View Farmers →"}
                </button>
              </Link>
            </div>

            {/* Quick navigation */}
            <div className="bg-white border border-[var(--border)] rounded-2xl p-5">
              <h3 className="font-bold text-[var(--text-primary)] mb-3">Quick Links</h3>
              <div className="space-y-1">
                {[
                  { label: "Manage Users",    to: "/admin/users",    badge: data.consumers.length },
                  { label: "Manage Farmers",  to: "/admin/farmers",  badge: data.farmers.length  },
                  { label: "Manage Products", to: "/admin/products", badge: data.allProducts.length },
                ].map(({ label, to, badge }) => (
                  <Link key={to} to={to}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[var(--surface)] transition text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] min-h-[44px]">
                    <span>{label}</span>
                    <span className="text-xs bg-[var(--surface)] px-2 py-0.5 rounded-full font-semibold text-[var(--text-muted)]">{badge}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}