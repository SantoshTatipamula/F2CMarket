import { motion } from "framer-motion";
import { floating } from "../../../utils/animations";

export default function FloatingBadge({
  title,
  value,
  className = "",
  delay = 0,
}) {
  return (
    <motion.div
      variants={floating}
      animate="animate"
      transition={{ delay }}
      className={`hidden md:block absolute bg-[var(--bg)] shadow-xl rounded-2xl px-5 py-4 z-20 ${className}`}
    >
      <p className="text-sm text-[var(--text-muted)]">{title}</p>
      <h4 className="font-bold text-[var(--primary)]">{value}</h4>
    </motion.div>
  );
}