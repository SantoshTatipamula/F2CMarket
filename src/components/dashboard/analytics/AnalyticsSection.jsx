export default function AnalyticsSection({
  title,
  description,
  children,
}) {
  return (
    <section className="space-y-5">
      
      {/* Header */}
      <div>
        
        <h2
          className="
            text-2xl font-bold
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
              text-sm
              text-[var(--text-secondary)]
            "
          >
            {description}
          </p>
        )}
      </div>

      {/* Content */}
      {children}
    </section>
  );
}