import { useMemo, useState } from "react";

import OrdersList from "@/components/farmer/orders/OrdersList";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import WorkspaceActions from "@/components/farmer/workspace/WorkspaceActions";

import { farmerOrdersData } from "@/data/farmerOrdersData";

export default function Orders() {
  const [search, setSearch] = useState("");

  // Search Filter
  const filteredOrders = useMemo(() => {
    return farmerOrdersData.filter((order) =>
      order.customerName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <section className="space-y-8 py-8">
      
      {/* Workspace Header */}
      <WorkspaceHeader
        title="Orders"
        description="Track customer purchases and delivery status."
      />

      {/* Workspace Actions */}
      <WorkspaceActions
        searchValue={search}
        onSearchChange={setSearch}
        placeholder="Search customer orders..."
      />

      {/* Orders */}
      <OrdersList
        orders={filteredOrders}
      />
    </section>
  );
}