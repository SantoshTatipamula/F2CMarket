import { ShieldCheck } from "lucide-react";
import InfoPageHero from "../shared/InfoPageHero";

export default function PrivacyHero() {
  return (
    <InfoPageHero
      icon={ShieldCheck}
      badge="Data Protection"
      title="Privacy"
      highlightedText="Policy"
      description="Learn how F2CMARKET collects, uses, and protects your
          information while providing a secure marketplace for
          farmers and consumers."
    />
  );
}