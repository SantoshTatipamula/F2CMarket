export default function SectionHeader({
  badge,
  icon,
  title,
  highlight,
  description,
  center = true,
}) {
  return (
    <div className={`${center ? "text-center" : ""} mb-14`}>
      {badge && (
        <span className="inline-flex items-center gap-2 bg-green-100 hover:bg-[var(--primary-hover)] px-4 py-2 rounded-full text-sm font-semibold my-3">
          <span>
            <img src={icon} alt="Herbal Leaves" className="w-5" />
          </span>{" "}
          {badge}
        </span>
      )}

      <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] leading-tight">
        {title}{" "}
        {highlight && <span className="text-[var(--primary)]">{highlight}</span>}
      </h2>

      {description && (
        <p className="mt-4 text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
