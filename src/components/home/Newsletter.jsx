import { motion } from "framer-motion";

import SectionHeader from "../common/sections/SectionHeader";
import NewsletterContent from "../common/sections/NewsletterContent";
import NewsletterForm from "../common/sections/NewsletterForm";

import {
  fadeUp,
  fadeLeft,
  fadeRight,
} from "../../utils/animations";

export default function Newsletter() {
  return (
    <motion.section
      className="py-20 bg-white relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
    >

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div variants={fadeUp}>
          <SectionHeader
            badge="📩 Stay Updated"
            title="Fresh Offers in Your"
            highlight="Inbox"
            description="Get seasonal deals, new arrivals and farm-fresh updates delivered directly to your email."
          />
        </motion.div>

        {/* CTA Box */}
        <motion.div
          variants={fadeUp}
          className="mt-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-[32px] p-8 md:p-12 shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left Content */}
            <motion.div variants={fadeLeft}>
              <NewsletterContent />
            </motion.div>

            {/* Right Form */}
            <motion.div variants={fadeRight}>
              <NewsletterForm />
            </motion.div>

          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}