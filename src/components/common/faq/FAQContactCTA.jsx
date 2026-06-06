import { MessageCircle } from "lucide-react";
import InfoCTA from "../shared/InfoCTA";

export default function FAQContactCTA() {
  return (
    <InfoCTA
      icon={MessageCircle}
      title="Still Need Help?"
      description="Can't find the answer you're looking for? Our support team is always ready to assist you."
      primaryLabel="Contact Us"
      primaryLink="/contact"
      secondaryLabel="Visit Help Center"
      secondaryLink="/helpCenter"
    />
  );
}