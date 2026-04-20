export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  center = true,
}) {
  return (
    <div className={`${center ? "text-center" : ""} mb-14`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
          {badge}
        </span>
      )}

      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
        {title}{" "}
        {highlight && (
          <span className="text-green-600">{highlight}</span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}