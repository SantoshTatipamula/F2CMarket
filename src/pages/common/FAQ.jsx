import { useState } from "react";

import FAQHero from "@/components/common/faq/FAQHero";
import FAQAccordion from "@/components/common/faq/FAQAccordion";
import FAQContactCTA from "@/components/common/faq/FAQContactCTA";

import CategoryFilters from "@/components/common/shared/CategoryFilters";

const categories = [
  "All",
  "Orders",
  "Payments",
  "Delivery",
  "Farmers",
  "Products",
  "Account",
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  return (
    <>
      <FAQHero />

      <CategoryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <FAQAccordion
        selectedCategory={selectedCategory}
      />

      <FAQContactCTA />
    </>
  );
}