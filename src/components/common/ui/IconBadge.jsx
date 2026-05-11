/**
 * A coloured circle that wraps a Lucide icon — used in empty states,
 * not-found panels, info cards, etc.
 *
 * @param {React.ElementType} icon    - Lucide icon component
 * @param {number}   [size=30]        - Icon size in px
 * @param {string}   [bg]             - Tailwind bg class  (default: surface)
 * @param {string}   [color]          - Tailwind text class (default: muted)
 * @param {string}   [className]      - Extra classes on the outer div
 */
export default function IconBadge({
  icon: Icon,
  size = 30,
  bg = "bg-[var(--surface)]",
  color = "text-[var(--text-muted)]",
  className = "",
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl ${bg} ${className}`}
      style={{ width: size * 1.8, height: size * 1.8 }}
    >
      <Icon size={size} className={color} />
    </div>
  );
}
