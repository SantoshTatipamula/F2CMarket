import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function InfoCTA({
  icon: Icon,
  title,
  description,
  primaryLabel,
  primaryLink,
  secondaryLabel,
  secondaryLink,
}) {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div
          className="
            rounded-3xl
            bg-gradient-to-r
            from-[var(--primary)]
            to-green-600
            p-8 md:p-12
            text-center
            text-white
          "
        >
          {Icon && (
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center">
                <Icon size={30} />
              </div>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold">
            {title}
          </h2>

          <p className="mt-4 text-green-50 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={primaryLink}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6 py-4
                rounded-2xl
                bg-white
                text-[var(--primary)]
                font-semibold
                hover:scale-105
                transition
              "
            >
              {primaryLabel}
                <ArrowRight size={18} />
            </Link>

            <Link
              to={secondaryLink}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6 py-4
                rounded-2xl
                border border-white/30
                text-white
                font-semibold
                hover:bg-white/10
                transition
              "
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}