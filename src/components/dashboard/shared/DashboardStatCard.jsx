export default function DashboardStatCard({
  title,
  value,
  icon: Icon,
  description,
}) {
  return (
    <article
      className="
        rounded-[24px]
        border border-black/5
        bg-[var(--surface-2)]

        p-4 sm:p-5

        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      
      {/* Top */}
      <div
        className="
          flex items-start
          justify-between
          gap-3
        "
      >
        
        {/* Content */}
        <div className="min-w-0">
          
          <p
            className="
              text-xs font-medium
              text-[var(--text-secondary)]
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-2
              text-2xl sm:text-3xl
              font-bold
              tracking-tight
              text-[var(--text-primary)]
            "
          >
            {value}
          </h3>
        </div>

        {/* Icon */}
        <div
          className="
            flex h-11 w-11
            shrink-0
            items-center justify-center

            rounded-2xl

            bg-[var(--primary)]/10
            text-[var(--primary)]

            sm:h-14 sm:w-14
          "
        >
          <Icon size={22} />
        </div>
      </div>

      {/* Description */}
      <p
        className="
          mt-4

          text-xs leading-relaxed
          text-[var(--text-secondary)]

          sm:text-sm
        "
      >
        {description}
      </p>
    </article>
  );
}