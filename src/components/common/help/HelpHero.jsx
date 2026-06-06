import { LifeBuoy } from "lucide-react";
import InfoPageHero from "../shared/InfoPageHero";

export default function HelpHero() {
  return (
    <InfoPageHero
      icon={LifeBuoy}
      badge="Support Center"
      title="How Can We"
      highlightedText="Help You?"
      description="Find helpful guides, support resources and answers to make the most of your F2CMARKET experience."
    />
  );
}