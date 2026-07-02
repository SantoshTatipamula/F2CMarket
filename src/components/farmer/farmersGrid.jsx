import { memo } from "react";
import { Sprout } from "lucide-react";
import FarmerCard from "./farmerCard";
import EmptyState from "@/components/common/ui/EmptyState";

function FarmersGrid({
  farmers = [],
}) {
  if (farmers.length === 0) {
    return (
      <EmptyState
        icon={Sprout}
        title="No Farmers Found"
        description="Try a different search, or check back soon as more farmers join."
      />
    );
  }

  return (
    <section
      className="
        grid grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6 lg:gap-8
      "
    >
      {farmers.map((farmer) => (
        <FarmerCard
          key={farmer.id}
          farmer={farmer}
        />
      ))}
    </section>
  );
}

export default memo(FarmersGrid);