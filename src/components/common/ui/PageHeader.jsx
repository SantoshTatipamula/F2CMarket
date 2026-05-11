/**
 * Consistent page-level header with title, subtitle, and an optional trailing slot.
 *
 * @param {string}          title       - Primary heading
 * @param {string}          [subtitle]  - Supporting copy below the title
 * @param {React.ReactNode} [action]    - Trailing element (button, badge, etc.)
 * @param {string}          [className] - Extra classes on the outer wrapper
 */
export default function PageHeader({
  title,
  subtitle,
  action,
  className = "",
}) {
  return (
    <div className={`mb-8 flex flex-wrap items-center justify-between gap-4 ${className}`}>
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-[var(--text-secondary)]">{subtitle}</p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
