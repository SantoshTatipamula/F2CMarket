import StatsGrid from "@/components/farmer/dashboard/StatsGrid";

import RecentOrders from "@/components/farmer/dashboard/RecentOrders";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

export default function Dashboard() {
  return (
    <section className="space-y-8 py-8">
      
      {/* Workspace Header */}
      <WorkspaceHeader
        title="Farmer Workspace"
        description="Manage your products, orders, and marketplace activity."
      />

      {/* Welcome Banner */}
      <div
        className="
          relative overflow-hidden
          rounded-3xl
          border border-[var(--border)]
          bg-gradient-to-br
          from-[var(--primary)]/15
          via-[var(--surface)]
          to-[var(--surface)]
          p-6 md:p-8
        "
      >
        
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] leading-tight">
            Grow your farm business with F2CMARKET
          </h2>

          <p className="mt-3 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
            Connect directly with consumers, manage your inventory,
            track orders, and monitor your growth — all from one unified platform.
          </p>
        </div>
      </div>

      {/* Insights */}
      <StatsGrid />

      {/* Recent Orders */}
      <RecentOrders />
    </section>
  );
}