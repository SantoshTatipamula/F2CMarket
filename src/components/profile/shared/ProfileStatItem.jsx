export default function ProfileStatItem({
  label,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-black/5
        bg-[var(--surface-2)]
        p-5
      "
    >
      
      <p
        className="
          text-sm
          text-[var(--text-secondary)]
        "
      >
        {label}
      </p>

      <h3
        className="
          mt-2
          text-2xl font-bold
          text-[var(--text-primary)]
        "
      >
        {value}
      </h3>
    </div>
  );
}