import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

/**
 * Breadcrumb trail.
 *
 * @param {Array<{label: string, href?: string}>} items
 *   Each item has a label. Only the last item is rendered as plain text (current page).
 *   All others are clickable links.
 *
 * Usage:
 *   <Breadcrumb items={[
 *     { label: "Products", href: "/products" },
 *     { label: "Tomatoes" },          ← current page, no href
 *   ]} />
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm mb-6">
      {/* Home is always the root */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
      >
        <Home size={14} />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="inline-flex items-center gap-1.5">
            <ChevronRight size={13} className="text-[var(--text-muted)]" />
            {isLast || !item.href ? (
              <span className="font-medium text-[var(--text-primary)] truncate max-w-[180px]">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
