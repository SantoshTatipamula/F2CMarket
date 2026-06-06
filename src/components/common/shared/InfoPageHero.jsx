import { motion } from "framer-motion";

export default function InfoPageHero({
  icon: Icon,
  badge,
  title,
  highlightedText,
  description,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white py-16 md:py-20 lg:py-24">
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-green-100 text-[var(--primary)] px-4 py-2 rounded-full font-medium"
        >
          <Icon size={16} />
          {badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)]"
        >
          {title}
          {highlightedText && (
            <span className="block text-[var(--primary)] mt-2">
              {highlightedText}
            </span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-3xl mx-auto mt-6 text-base md:text-lg text-[var(--text-secondary)] leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}