export default function DashboardCard({
  children,
  className = "",
}) {
  return (
    <section
      className={`
        overflow-hidden
        rounded-[28px]
        border border-black/5
        bg-[var(--surface)]
        p-6
        shadow-sm
        transition-all duration-300
        hover:shadow-md
        ${className}
      `}
    >
      {children}
    </section>
  );
}