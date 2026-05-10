import { useMemo, useState } from "react";

import { farmersData } from "@/data/farmersData";

import FarmersPageHeader from "@/components/farmer/FarmersPageHeader";
import FarmersGrid from "@/components/farmer/FarmersGrid";

export default function Farmers() {
  const [searchQuery, setSearchQuery] =
    useState("");

  /* Filter Farmers */
  const filteredFarmers = useMemo(() => {
    return farmersData.filter((farmer) =>
      farmer.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--surface)]">

      {/* Header */}
      <FarmersPageHeader
        totalFarmers={filteredFarmers.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Farmers List */}
      <section className="max-w-5xl mx-auto px-4 py-6">

        <FarmersGrid
          farmers={filteredFarmers}
        />

      </section>

    </div>
  );
}