import { motion } from "framer-motion";
import { Users, Search, Leaf, ShieldCheck, TrendingUp } from "lucide-react";
import { revealUp, revealLeft, revealRight, stagger, viewport } from "@/utils/scrollReveal";

const highlights = [
  { icon: ShieldCheck, label: "Verified Farmers", color: "bg-green-50 text-green-700" },
  { icon: Leaf,        label: "Chemical-Free",    color: "bg-emerald-50 text-emerald-700" },
  { icon: TrendingUp,  label: "Direct Trade",     color: "bg-teal-50 text-teal-700" },
];

export default function FarmersPageHeader({ totalFarmers, searchQuery, setSearchQuery }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-800">
      {/* Background texture circles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/[0.03]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">

        {/* Pill label */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewport} variants={revealUp}
          className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2"
        >
          <Users size={15} className="text-green-300" />
          <span className="text-sm font-medium text-green-200">Trusted Local Farmers</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial="hidden" whileInView="visible" viewport={viewport} variants={revealLeft}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight max-w-3xl"
        >
          Meet the Hands<br />
          <span className="text-green-300">Behind Your Food</span>
        </motion.h1>

        <motion.p
          initial="hidden" whileInView="visible" viewport={viewport}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } }}
          className="mt-5 max-w-xl text-base sm:text-lg text-green-100/80 leading-relaxed"
        >
          Connect directly with verified local farmers growing fresh, healthy products
          across Telangana and Andhra Pradesh.
        </motion.p>

        {/* Highlight pills */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
          className="mt-8 flex flex-wrap gap-3"
        >
          {highlights.map(({ icon: Icon, label, color }) => (
            <motion.span
              key={label}
              variants={revealUp}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold ${color} border border-white/10`}
            >
              <Icon size={13} />
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* Search + count row */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewport}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.35 } } }}
          className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg"
        >
          {/* Search bar */}
          <div className="flex flex-1 items-center gap-2 h-12 px-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 focus-within:bg-white/15 focus-within:border-white/40 transition">
            <Search size={17} className="text-white/60 shrink-0" />
            <input
              type="text"
              placeholder="Search farmers by name…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/50"
            />
          </div>

          {/* Count badge */}
          <div className="h-12 px-5 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold whitespace-nowrap shadow-lg shadow-green-900/40">
            {totalFarmers} Farmers
          </div>
        </motion.div>

      </div>
    </section>
  );
}
