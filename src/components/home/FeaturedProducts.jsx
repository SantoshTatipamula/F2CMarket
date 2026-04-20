import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

import ProductCard from "../product/ProductCard";
import { products } from "@/data/FeaturedProductsData";
import SectionHeader from "../common/sections/SectionHeader";

export default function FeaturedProducts() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      className="py-20 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

      <motion.div
        variants={fadeUp}
        className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10"
      >
        {/* Section Header */}
        <SectionHeader
          badge="🛒 Featured Products"
          title="Fresh Picks From"
          highlight="Local Farmers"
          description="Handpicked vegetables, fruits and essentials delivered directly from local farmers to your home."
        />

        {/* Product Grid */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {products.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <ProductCard key={item.id} product={item} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
