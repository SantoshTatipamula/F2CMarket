import { Users } from "lucide-react";

import FarmerCard from "./FarmerCard";
import EmptyState from "@/components/common/ui/EmptyState";

export default function FarmersGrid({ farmers, gridClassName = "" }) {
  if (farmers.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No Farmers Found"
        description="Try changing search or filters to discover more local farmers near you."
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 ${gridClassName}`}>
      {farmers.map((farmer) => (
        <FarmerCard key={farmer.id} farmer={farmer} />
      ))}
    </div>
  );
}
