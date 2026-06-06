import { useState } from "react";

import FAQHero from "@/components/common/faq/FAQHero";
import FAQAccordion from "@/components/common/faq/FAQAccordion";
import FAQContactCTA from "@/components/common/faq/FAQContactCTA";

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <>
      <FAQHero
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>
      <FAQAccordion
  selectedCategory={selectedCategory}
/>
      <FAQContactCTA />
    </>
  );
}
