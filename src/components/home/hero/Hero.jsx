import { motion } from "framer-motion";
import { fadeLeft, fadeRight } from "../../../utils/animations";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-orange-50 min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Side */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeft}
        >
          <HeroContent />
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeRight}
        >
          <HeroVisual />
        </motion.div>

      </div>
    </section>
  );
}