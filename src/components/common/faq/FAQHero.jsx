import { HelpCircle } from "lucide-react";
import InfoPageHero from "../shared/InfoPageHero";

export default function FAQHero() {
  return (
    <InfoPageHero
      icon={HelpCircle}
      badge="Questions & Support"
      title="Frequently Asked"
      highlightedText="Questions"
      description="Find answers to common questions about orders, products, payments, delivery and account management."
    />
  );
}