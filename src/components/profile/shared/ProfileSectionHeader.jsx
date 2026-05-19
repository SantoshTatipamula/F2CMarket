import { Link } from "react-router-dom";

export default function ProfileSectionHeader({
  title,
  description,
  buttonLabel,
  buttonHref,
}) {
  return (
    <div
      className="
        flex flex-col gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      
      {/* Left */}
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

        <p
          className="
            mt-2
            text-sm
            text-[var(--text-secondary)]
          "
        >
          {description}
        </p>
      </div>

      {/* Action */}
      {buttonLabel && buttonHref && (
        <Link
          to={buttonHref}
          className="
            inline-flex items-center
            justify-center
            rounded-2xl
            border border-black/5
            bg-[var(--surface-2)]
            px-5 py-3
            text-sm font-medium
            text-[var(--text-primary)]
            transition-all duration-300
            hover:border-[var(--primary)]/20
            hover:text-[var(--primary)]
          "
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  );
}