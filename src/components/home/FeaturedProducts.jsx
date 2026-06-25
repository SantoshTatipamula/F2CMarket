import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import cart from "../../assets/icons/shopping-cart.png";

import ProductCard from "../product/ProductCard";
import SectionHeader from "../common/sections/SectionHeader";

import { useProducts } from "@/context/ProductContext";
import { useLocation } from "@/context/LocationContext";

export default function FeaturedProducts() {

  const { products } = useProducts();
  const { selectedLocation } = useLocation();

  const nearbyProducts = products.filter(
  (product) =>
    selectedLocation?.city &&
    product.farmLocation?.city?.toLowerCase() ===
      selectedLocation.city.toLowerCase()
);

  const featuredProducts =
    nearbyProducts.length >= 4
      ? nearbyProducts.slice(0, 4)
      : products.slice(0, 4);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      className="py-20 bg-[var(--surface)] relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

      <motion.div
        variants={fadeUp}
        className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10"
      >
        <SectionHeader
          badge="Featured Products"
          icon={cart}
          title="Fresh Picks From"
          highlight={selectedLocation?.city || "Local Farmers"}
          description={`Fresh products available near ${
            selectedLocation?.city || "you"
          }.`}
        />

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {featuredProducts.length > 0 ? (
  featuredProducts.map((item) => (
    <motion.div key={item.id} variants={fadeUp}>
      <ProductCard product={item} />
    </motion.div>
  ))
) : (
  <div className="col-span-full text-center py-12">
    <p className="text-[var(--text-secondary)]">
      No products available yet.
    </p>
  </div>
)}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}