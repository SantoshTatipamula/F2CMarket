import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HelpContactCTA() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-[var(--primary)] to-green-600 p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Still Need Assistance?
          </h2>

          <p className="mt-4 text-green-50">
            Our support team is always ready to help.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-white text-[var(--primary)] px-6 py-4 rounded-2xl font-semibold"
            >
              Contact Us
            </Link>

            <Link
              to="/faq"
              className="border border-white/30 px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
            >
              Browse FAQs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}