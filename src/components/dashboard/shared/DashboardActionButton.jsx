import { Link } from "react-router-dom";

export default function DashboardActionButton({
  title,
  icon: Icon,
  href,
}) {
  return (
    <Link
      to={href}
      className="
        group

        flex flex-col
        items-center
        justify-center

        gap-4

        rounded-[24px]
        border border-black/5
        bg-[var(--surface-2)]

        px-6 py-8

        text-center

        transition-all duration-300
        hover:-translate-y-1
        hover:border-[var(--primary)]/20
        hover:bg-[var(--primary)]/5
        hover:shadow-lg
      "
    >
      
      {/* Icon */}
      <div
        className="
          flex h-16 w-16
          items-center justify-center

          rounded-2xl

          bg-[var(--primary)]/10
          text-[var(--primary)]

          transition-transform duration-300
          group-hover:scale-105
        "
      >
        <Icon size={28} />
      </div>

      {/* Title */}
      <h3
        className="
          max-w-[120px]

          text-center
          text-sm font-semibold
          leading-snug

          text-[var(--text-primary)]
        "
      >
        {title}
      </h3>
    </Link>
  );
}