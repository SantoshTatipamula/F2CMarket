import { Link } from "react-router-dom";

/**
 * Generic empty-state panel.
 *
 * @param {React.ElementType} icon   - Lucide icon component
 * @param {string}  title            - Bold heading
 * @param {string}  description      - Supporting copy
 * @param {string}  [ctaLabel]       - CTA button text (omit to hide)
 * @param {string}  [ctaHref]        - Route for the CTA link
 * @param {string}  [iconBg]         - Tailwind bg class for icon circle  (default: surface)
 * @param {string}  [iconColor]      - Tailwind text class for icon       (default: muted)
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  iconBg = "bg-[var(--surface)]",
  iconColor = "text-[var(--text-muted)]",
}) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-3xl p-10 text-center flex flex-col items-center">
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${iconBg}`}
      >
        <Icon size={30} className={iconColor} />
      </div>

      <h3 className="text-xl font-semibold text-[var(--text-primary)]">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-[var(--text-secondary)]">
          {description}
        </p>
      )}

      {ctaLabel && ctaHref && (
        <Link
          to={ctaHref}
          className="inline-flex mt-6 px-6 py-3 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
