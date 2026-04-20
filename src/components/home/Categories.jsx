import { motion } from "framer-motion";
import { fadeLeft, fadeUp, staggerContainer } from "../../utils/animations";

import SectionHeader from "../common/sections/SectionHeader";
import { categories } from "../../data/categoriesData";

export default function Categories() {
  return (
    <motion.section
      className="py-20 bg-slate-50 relative overflow-hidden"
      initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.15 }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

      <motion.div variants={fadeUp} className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Reusable Section Header */}
        <SectionHeader
          badge="🌿 Shop by Category"
          title="Fresh Essentials for"
          highlight="Every Home"
          description="Explore farm-fresh products directly sourced from trusted local farmers."
        />

        {/* Category Cards */}
        <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div variants={fadeUp}
                key={item.id}
                className="group bg-white border border-slate-200 rounded-3xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Icon Box */}
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${item.bg}`}
                >
                  <Icon size={30} className={item.color} />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-slate-800 group-hover:text-green-600 transition">
                  {item.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
