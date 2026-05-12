import { motion } from "framer-motion";
import { revealUp, stagger, viewport } from "@/utils/scrollReveal";

const stats = [
  { id: 1, value: "500+", label: "Farmers Connected" },
  { id: 2, value: "10K+", label: "Orders Delivered" },
  { id: 3, value: "25+",  label: "Cities Reached" },
  { id: 4, value: "98%",  label: "Customer Satisfaction" },
];

const AboutStats = () => (
  <section className="bg-[var(--bg)]">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={revealUp} className="max-w-3xl">
        <span className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">Platform Impact</span>
        <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl">Growing Local Agriculture Through Digital Commerce</h2>
        <p className="mt-5 text-[15px] leading-8 text-[var(--text-secondary)] md:text-base">F2CMARKET continues to connect farmers and consumers through a transparent marketplace focused on freshness, sustainability, and fair pricing.</p>
      </motion.div>

      <motion.div
        initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
        className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={revealUp}
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-sm)]"
          >
            <h3 className="text-4xl font-bold text-[var(--text-primary)]">{stat.value}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AboutStats;
