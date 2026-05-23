import { TrendingUp } from "lucide-react";

export default function AnalyticsStatCard({
  title,
  value,
  growth,
  icon: Icon,
}) {
  return (
    <div
      className="
        group
        relative overflow-hidden

        rounded-3xl
        border border-black/5

        bg-[var(--surface)]

        p-4

        shadow-sm

        transition-all duration-300

        hover:-translate-y-1
        hover:shadow-md

        sm:p-6
      "
    >
      {/* Hover Glow */}
      <div
        className="
          absolute inset-0

          bg-gradient-to-br
          from-[var(--primary)]/5
          via-transparent
          to-transparent

          opacity-0
          transition-opacity duration-300

          group-hover:opacity-100
        "
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p
              className="
                text-xs font-medium
                text-[var(--text-secondary)]

                sm:text-sm
              "
            >
              {title}
            </p>

            <h3
              className="
                mt-2

                text-xl font-bold
                tracking-tight

                text-[var(--text-primary)]

                sm:mt-3
                sm:text-3xl
              "
            >
              {value}
            </h3>
          </div>

          <div
            className="
              flex h-10 w-10
              items-center justify-center

              rounded-2xl

              bg-[var(--primary)]/10
              text-[var(--primary)]

              sm:h-12
              sm:w-12
            "
          >
            <Icon size={20} />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6">
          <div
            className="
              flex items-center gap-1

              rounded-full

              bg-green-100

              px-2 py-1

              text-[10px] font-semibold
              text-green-700

              sm:text-xs
            "
          >
            <TrendingUp size={12} />

            {growth}
          </div>

          <p
            className="
              text-[10px]
              text-[var(--text-secondary)]

              sm:text-xs
            "
          >
            vs last month
          </p>
        </div>
      </div>
    </div>
  );
}