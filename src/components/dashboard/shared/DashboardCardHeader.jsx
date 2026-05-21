export default function DashboardCardHeader({
  title,
  description,
  action,
}) {
  return (
    <div
      className="
        flex flex-col gap-4
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
    >
      
      {/* Left */}
      <div className="max-w-2xl">
        
        <h2
          className="
            text-xl font-bold
            tracking-tight
            text-[var(--text-primary)]
          "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
              mt-2
              text-sm leading-relaxed
              text-[var(--text-secondary)]
            "
          >
            {description}
          </p>
        )}
      </div>

      {/* Right Action */}
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}