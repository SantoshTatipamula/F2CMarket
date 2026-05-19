import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

export default function ActionCard({
  title,
  description,
  icon: Icon,
  href,
}) {
  return (
    <Link
      to={href}
      className="
        group
        rounded-3xl
        border border-black/5
        bg-[var(--surface)]
        p-5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      
      <div className="flex items-start justify-between gap-4">
        
        {/* Left */}
        <div className="space-y-4">
          
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              rounded-2xl
              bg-[var(--primary)]/10
              text-[var(--primary)]
            "
          >
            <Icon size={22} />
          </div>

          <div>
            
            <h3
              className="
                text-lg font-semibold
                text-[var(--text-primary)]
              "
            >
              {title}
            </h3>

            <p
              className="
                mt-2
                text-sm leading-relaxed
                text-[var(--text-secondary)]
              "
            >
              {description}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div
          className="
            text-[var(--text-secondary)]
            transition-transform duration-300
            group-hover:translate-x-1
          "
        >
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}