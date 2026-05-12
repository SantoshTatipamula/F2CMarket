import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { farmersData } from "@/data/farmersData";
import FarmersPageHeader from "@/components/farmer/FarmersPageHeader";
import FarmersGrid from "@/components/farmer/farmersGrid";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import { revealUp, viewport } from "@/utils/scrollReveal";

const STATS = [
  { value: "6+",   label: "Partner Farmers" },
  { value: "4.7",  label: "Avg Rating" },
  { value: "100%", label: "Verified" },
  { value: "0",    label: "Middlemen" },
];

export default function Farmers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFarmers = useMemo(
    () => farmersData.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]
  );

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <FarmersPageHeader
        totalFarmers={filteredFarmers.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Stats strip */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[var(--border)]">
            {STATS.map(({ value, label }, i) => (
              <motion.div key={label} initial="hidden" whileInView="visible" viewport={viewport}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } } }}
                className="py-6 px-4 text-center"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)]">{value}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)] font-medium">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <Breadcrumb items={[{ label: "Farmers" }]} />

        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={revealUp}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {searchQuery ? `Results for "${searchQuery}"` : "All Farmers"}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {filteredFarmers.length} farmer{filteredFarmers.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </motion.div>

        <FarmersGrid farmers={filteredFarmers} />
      </section>
    </div>
  );
}
