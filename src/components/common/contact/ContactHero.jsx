import { Mail } from "lucide-react";
import InfoPageHero from "../shared/InfoPageHero";

export default function ContactHero() {
  return (
    <InfoPageHero
      icon={Mail}
      badge="Contact F2CMARKET"
      title="Get In Touch With"
      highlightedText="Our Team"
      description="Have questions about products, orders, farmers, or partnerships? We're here to help."
    />
  );
}