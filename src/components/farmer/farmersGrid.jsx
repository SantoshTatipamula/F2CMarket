import { memo } from "react";
import FarmerCard from "./farmerCard";

function FarmersGrid({
  farmers = [],
}) {
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