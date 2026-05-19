export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
}) {
  return (
    <article
      className="
        group
        rounded-3xl
        border border-black/5
        bg-[var(--surface)]
        p-5
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      
      <div className="flex items-start justify-between gap-4">
        
        <div>
          
          <p
            className="
              text-sm
              text-[var(--text-secondary)]
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-3
              text-3xl font-bold
              tracking-tight
              text-[var(--text-primary)]
            "
          >
            {value}
          </h3>
        </div>

        <div
          className="
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            bg-[var(--primary)]/10
            text-[var(--primary)]
          "
        >
          <Icon size={22} />
        </div>
      </div>

      <p
        className="
          mt-5
          text-sm leading-relaxed
          text-[var(--text-secondary)]
        "
      >
        {description}
      </p>
    </article>
  );
}