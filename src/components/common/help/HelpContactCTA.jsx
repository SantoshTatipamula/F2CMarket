import { LifeBuoy } from "lucide-react";
import InfoCTA from "../shared/InfoCTA";

export default function HelpContactCTA() {
  return (
    <InfoCTA
      icon={LifeBuoy}
      title="Still Need Assistance?"
      description="Our support team is always ready to help."
      primaryLabel="Contact Us"
      primaryLink="/contact"
      secondaryLabel="Browse FAQs"
      secondaryLink="/faq"
    />
  );
}