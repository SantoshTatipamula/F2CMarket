import { motion } from "framer-motion";
import farmerImage from "@/assets/images/farmer.jpeg";
import { revealLeft, revealRight, viewport } from "@/utils/scrollReveal";
import Breadcrumb from "@/components/common/ui/Breadcrumb";

const AboutHero = () => (
  <section className="border-b border-[var(--border)] bg-[var(--bg)]">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: "About" }]} />

      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={revealLeft}>
          <span className="mb-4 inline-block text-sm font-medium text-[var(--primary)]">ABOUT F2CMARKET</span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
            Building a Better Connection Between Farmers and Consumers
          </h1>
          <div className="mt-6 space-y-5 text-base leading-8 text-[var(--text-secondary)]">
            <p>F2CMARKET is a modern farmer-to-consumer marketplace designed to help local farmers sell fresh agricultural products directly to consumers without relying on middlemen.</p>
            <p>Our platform focuses on transparency, fair pricing, sustainable agriculture, and creating stronger relationships between farmers and customers through digital commerce.</p>
            <p>By connecting farms directly with households, we aim to support local agriculture while helping consumers access fresher and healthier food products.</p>
          </div>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={revealRight}>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-white shadow-[var(--shadow-sm)]">
            <img src={farmerImage} alt="Farmer" className="h-[420px] w-full object-cover" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutHero;
