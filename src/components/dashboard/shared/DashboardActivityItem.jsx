export default function ActivityItem({
  title,
  description,
  time,
  icon: Icon,
}) {
  return (
    <article
      className="
        flex gap-4
        rounded-2xl
        border border-black/5
        bg-[var(--surface-2)]
        p-4
        transition-all duration-300
        hover:border-[var(--primary)]/10
      "
    >
      
      {/* Icon */}
      <div
        className="
          flex h-11 w-11
          shrink-0
          items-center justify-center
          rounded-2xl
          bg-[var(--primary)]/10
          text-[var(--primary)]
        "
      >
        <Icon size={20} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        
        <div
          className="
            flex flex-col gap-2
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          
          <h3
            className="
              text-base font-semibold
              text-[var(--text-primary)]
            "
          >
            {title}
          </h3>

          <span
            className="
              text-xs
              text-[var(--text-secondary)]
            "
          >
            {time}
          </span>
        </div>

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
    </article>
  );
}