import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import question from "../../assets/icons/question-mark.png";
import SectionHeader from "../common/sections/SectionHeader";
import IconCard from "../common/cards/IconCard";
import { benefits } from "../../data/whyChooseUsData";

export default function WhyChooseUs() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      className="py-20 bg-[var(--bg)] "
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div variants={fadeUp}>
          <SectionHeader
            badge="Why Choose F2CMARKET"
            icon={question}
            title="Better Food,"
            highlight="Better Experience"
            description="We connect customers with local farmers through a simple trusted platform."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {benefits.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <IconCard
                key={item.id}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                bg={item.bg}
                color={item.color}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
