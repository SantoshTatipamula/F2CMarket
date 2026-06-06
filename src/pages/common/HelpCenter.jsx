import { useState } from "react";

import HelpHero from "@/components/common/help/HelpHero";
import HelpCategories from "@/components/common/help/HelpCategories";
import HelpResources from "@/components/common/help/HelpResources";
import HelpContactCTA from "@/components/common/help/HelpContactCTA";

export default function HelpCenter() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  return (
    <>
      <HelpHero />

      <HelpCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <HelpResources
        selectedCategory={selectedCategory}
      />

      <HelpContactCTA />
    </>
  );
}