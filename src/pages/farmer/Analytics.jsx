import StatsGrid from "@/components/farmer/dashboard/StatsGrid";

import RecentOrders from "@/components/farmer/dashboard/RecentOrders";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import WorkspaceActions from "@/components/farmer/workspace/WorkspaceActions";

export default function Analytics() {
  return (
    <section
  className="
    mx-auto
    w-full
    max-w-7xl
    space-y-8
    px-4
    py-6
    sm:px-6
    lg:px-8
    lg:py-8
  "
>
      
      {/* Workspace Header */}
      <WorkspaceHeader
        title="Analytics"
        description="Monitor your farm performance and customer activity."
      />

      {/* Workspace Controls */}
      <WorkspaceActions>
        <button
          className="
            h-11 px-4 rounded-xl
            border border-[var(--border)]
            bg-[var(--surface)]
            text-sm font-medium
          "
        >
          This Month
        </button>

        <button
          className="
            h-11 px-4 rounded-xl
            border border-[var(--border)]
            bg-[var(--surface)]
            text-sm font-medium
          "
        >
          Export
        </button>
      </WorkspaceActions>

      {/* Stats */}
      <StatsGrid />

      {/* Recent Activity */}
      <RecentOrders />
    </section>
  );
}