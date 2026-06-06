import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQContactCTA() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="
            rounded-3xl
            bg-gradient-to-r
            from-[var(--primary)]
            to-green-600
            p-8 md:p-12
            text-center
            text-white
          "
        >
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
              <MessageCircle size={30} />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold">
            Still Need Help?
          </h2>

          <p className="mt-4 text-green-50 max-w-2xl mx-auto leading-relaxed">
            Can't find the answer you're looking for? Our support team is
            always ready to assist you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6 py-4
                rounded-2xl
                bg-white
                text-[var(--primary)]
                font-semibold
                hover:scale-105
                transition
              "
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/help"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6 py-4
                rounded-2xl
                border border-white/30
                text-white
                font-semibold
                hover:bg-white/10
                transition
              "
            >
              Visit Help Center
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}