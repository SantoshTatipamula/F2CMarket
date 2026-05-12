import { motion } from "framer-motion";
import { revealLeft, revealRight, viewport } from "@/utils/scrollReveal";

const AboutStory = () => (
  <section className="bg-[var(--surface)]">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={revealLeft} className="max-w-3xl">
        <span className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">Our Story</span>
        <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl">Why We Built F2CMARKET</h2>
      </motion.div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {[
          ["Farmers play a vital role in providing fresh food to communities, yet many still struggle with low profits due to middlemen, unfair pricing, and limited market access.",
           "At the same time, consumers often face high prices and difficulty finding fresh, trustworthy farm products directly from local sources.",
           "F2CMARKET was created to bridge this gap by building a digital platform where farmers can directly connect with consumers in a transparent and efficient way."],
          ["Our goal is to empower local farmers through technology while helping consumers access fresher, healthier, and more affordable agricultural products.",
           "By removing unnecessary intermediaries, we aim to create a fairer marketplace that supports sustainable farming and strengthens local agricultural communities.",
           "F2CMARKET is more than an ecommerce platform — it is a step toward building a stronger and more connected farming ecosystem."]
        ].map((paragraphs, i) => (
          <motion.div
            key={i}
            initial="hidden" whileInView="visible" viewport={viewport}
            variants={i === 0 ? revealLeft : revealRight}
            className="space-y-6 text-[15px] leading-8 text-[var(--text-secondary)] md:text-base"
          >
            {paragraphs.map((p, j) => <p key={j}>{p}</p>)}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutStory;
