export default function ProfileInfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex items-start gap-4
        rounded-2xl
        border border-black/5
        bg-[var(--surface-2)]
        p-4
      "
    >
      
      <div
        className="
          flex h-11 w-11
          items-center justify-center
          rounded-2xl
          bg-[var(--primary)]/10
          text-[var(--primary)]
        "
      >
        <Icon size={20} />
      </div>

      <div>
        
        <p
          className="
            text-xs font-medium uppercase
            tracking-wide
            text-[var(--text-secondary)]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1 text-sm font-semibold
            text-[var(--text-primary)]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}