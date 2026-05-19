export default function ProfileCardHeader({
  title,
  description,
}) {
  return (
    <div>
      
      <h2
        className="
          text-xl font-bold
          text-[var(--text-primary)]
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            mt-2
            text-sm leading-relaxed
            text-[var(--text-secondary)]
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}