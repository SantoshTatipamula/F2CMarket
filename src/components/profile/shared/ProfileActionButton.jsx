import { Link } from "react-router-dom";

export default function ProfileActionButton({
  to,
  children,
  variant = "primary",
}) {
  return (
    <Link
      to={to}
      className={`
        inline-flex items-center justify-center
        rounded-2xl
        px-5 py-3
        text-sm font-semibold
        transition-all duration-300

        ${
          variant === "primary"
            ? `
              bg-[var(--primary)]
              text-white
              hover:opacity-90
            `
            : `
              border border-black/10
              bg-white
              text-[var(--text-primary)]
              hover:bg-[var(--surface-2)]
            `
        }
      `}
    >
      {children}
    </Link>
  );
}