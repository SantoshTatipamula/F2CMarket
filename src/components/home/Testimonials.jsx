import { motion } from "framer-motion";
import SectionHeader from "../common/sections/SectionHeader";
import TestimonialCard from "../common/cards/TestimonialCard";
import { testimonials as staticTestimonials } from "../../data/testimonialsData";
import { fadeUp, staggerContainer } from "../../utils/animations";
import { useEffect, useState } from "react";
import { getTopReviews } from "@/services/reviewService";

import message from "../../assets/icons/message.png";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const reviews = await getTopReviews(6);

        // Only replace if reviews exist
        if (reviews.length > 0) {
          setTestimonials(reviews);
        }
      } catch (error) {
        console.error("Failed to load testimonials:", error);

        // Keep static data as fallback
      }
    };

    loadTestimonials();
  }, []);

  return (
    <motion.section
      className="py-20 bg-[var(--surface)] relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div variants={fadeUp}>
          <SectionHeader
            badge="Testimonials"
            icon={message}
            title="What Our Customers"
            highlight="Say"
            description="Real experiences from people who buy fresh products through F2CMARKET."
          />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch"
        >
          {testimonials.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <TestimonialCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
