export default function DashboardCard({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color = "text-[var(--primary)]",
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl p-4 shadow-sm">
      
      {/* Top Section */}
      <div className="flex items-start justify-between">
        
        {/* Text */}
        <div>
          <p className="text-sm text-[var(--text-secondary)]">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">
            {value}
          </h3>
        </div>

        {/* Icon */}
        {Icon && (
          <div
            className={`
              flex items-center justify-center
              h-11 w-11 rounded-xl
              bg-[var(--surface-2)]
              ${color}
            `}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      {/* Bottom Trend */}
      {(trend || trendLabel) && (
        <div className="mt-4 flex items-center gap-2">
          
          {trend && (
            <span className="text-sm font-semibold text-green-500">
              {trend}
            </span>
          )}

          {trendLabel && (
            <span className="text-xs text-[var(--text-secondary)]">
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}