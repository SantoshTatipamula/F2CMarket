import { FileCheck } from "lucide-react";
import InfoPageHero from "../shared/InfoPageHero";

export default function TermsHero() {
  return (
    <InfoPageHero
      icon={FileCheck}
      badge="Platform Rules"
      title="Terms &"
      highlightedText="Conditions"
      description=" Understand the guidelines, responsibilities, and rules
          that govern the use of the F2CMARKET platform."
    />
  );
}