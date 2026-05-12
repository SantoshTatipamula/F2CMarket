import { Users } from "lucide-react";
import FarmerCard from "./FarmerCard";
import EmptyState from "@/components/common/ui/EmptyState";

export default function FarmersGrid({ farmers }) {
  if (farmers.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No Farmers Found"
        description="Try changing your search to discover more local farmers near you."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {farmers.map((farmer, index) => (
        <FarmerCard key={farmer.id} farmer={farmer} index={index} />
      ))}
    </div>
  );
}
