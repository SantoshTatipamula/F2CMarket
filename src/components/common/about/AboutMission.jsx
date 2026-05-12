import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Sprout } from "lucide-react";
import { revealUp, revealLeft, stagger, viewport } from "@/utils/scrollReveal";

const values = [
  { id: 1, title: "Sustainability", description: "We support farming practices that encourage healthier food systems and long-term agricultural growth.", icon: Leaf },
  { id: 2, title: "Transparency", description: "We believe consumers should know where their food comes from and farmers should receive fair value.", icon: ShieldCheck },
  { id: 3, title: "Farmer Empowerment", description: "Our platform helps local farmers reach more customers through direct digital commerce.", icon: Sprout },
];

const AboutMission = () => (
  <section className="bg-[var(--bg)]">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {[
          { label: "Our Mission", heading: "Supporting Farmers Through Technology", body: "Our mission is to create a direct and transparent marketplace where farmers can sell fresh agricultural products to consumers without unnecessary intermediaries, helping both communities and local agriculture grow together." },
          { label: "Our Vision",  heading: "Building a Sustainable Farming Ecosystem",  body: "We envision a future where technology strengthens the connection between farms and households, promotes sustainable agriculture, and creates better opportunities for farmers across local communities." },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial="hidden" whileInView="visible" viewport={viewport} variants={revealUp}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">{item.label}</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl">{item.heading}</h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[var(--text-secondary)] md:text-base">{item.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={revealLeft} className="max-w-3xl">
          <span className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">Core Values</span>
          <h3 className="mt-3 text-3xl font-bold text-[var(--text-primary)]">What Drives F2CMARKET</h3>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div key={value.id} variants={revealUp}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-white p-7 transition-all duration-300 hover:shadow-[var(--shadow-sm)] hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface)]">
                  <Icon className="h-6 w-6 text-[var(--primary)]" strokeWidth={2} />
                </div>
                <h4 className="mt-6 text-xl font-semibold text-[var(--text-primary)]">{value.title}</h4>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{value.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutMission;
