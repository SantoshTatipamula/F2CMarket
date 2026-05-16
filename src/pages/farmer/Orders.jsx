import { useMemo } from "react";

import { useSearch } from "@/context/SearchContext";

import OrdersList from "@/components/farmer/orders/OrdersList";

import WorkspaceHeader from "@/components/farmer/workspace/WorkspaceHeader";

import WorkspaceActions from "@/components/farmer/workspace/WorkspaceActions";

import { farmerOrdersData } from "@/data/farmerOrdersData";

export default function Orders() {
  const { searchQuery } = useSearch();

  // Search Filter
  const filteredOrders = useMemo(() => {
    return farmerOrdersData.filter((order) =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );
  }, [searchQuery]);

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
        title="Orders"
        description="Track customer purchases and delivery status."
      />



      {/* Orders */}
      <OrdersList orders={filteredOrders} />
    </section>
  );
}
