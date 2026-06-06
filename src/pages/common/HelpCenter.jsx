import { useState } from "react";

import HelpHero from "@/components/common/help/HelpHero";
import HelpResources from "@/components/common/help/HelpResources";
import HelpContactCTA from "@/components/common/help/HelpContactCTA";


import CategoryFilters from "@/components/common/shared/CategoryFilters";

const categories = [
  "All",
  "Orders",
  "Payments",
  "Farmers",
  "Products",
  "Account",
  "Security",
];


export default function HelpCenter() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  return (
    <>
      <HelpHero />

      <CategoryFilters
      categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <HelpResources
        selectedCategory={selectedCategory}
      />

      <HelpContactCTA />
    </>
  );
}