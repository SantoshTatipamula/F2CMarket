/**
 * Reusable framer-motion scroll-reveal variants.
 * Import the variant you need and spread it on a <motion.*> element.
 *
 * Usage:
 *   import { revealUp, revealLeft, stagger } from "@/utils/scrollReveal";
 *
 *   <motion.div initial="hidden" whileInView="visible"
 *     viewport={{ once: true, amount: 0.15 }} variants={revealUp}>
 *     …
 *   </motion.div>
 */

export const revealUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const revealLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const revealRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const revealScale = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/** Viewport config shorthand — pass as viewport prop */
export const viewport = { once: true, amount: 0.15 };
