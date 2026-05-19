export default function ProfileCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-[28px]
        border border-black/5
        bg-[var(--surface)]
        p-6
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}