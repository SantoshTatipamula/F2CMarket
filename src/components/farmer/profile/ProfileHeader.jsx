export default function ProfileHeader() {
  return (
    <div
      className="
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-6 md:p-8
      "
    >
      
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        
        {/* Avatar */}
        <div
          className="
            flex items-center justify-center
            h-24 w-24 rounded-3xl
            bg-[var(--primary)] text-white
            text-3xl font-bold
          "
        >
          F
        </div>

        {/* Info */}
        <div className="flex-1">
          
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Green Valley Farm
          </h2>

          <p className="mt-2 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            Organic farm delivering fresh vegetables directly to consumers through F2CMARKET.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
            
            <span className="rounded-full bg-[var(--surface-2)] px-3 py-1">
              Andhra Pradesh
            </span>

            <span className="rounded-full bg-[var(--surface-2)] px-3 py-1">
              Since 2024
            </span>

            <span className="rounded-full bg-[var(--surface-2)] px-3 py-1">
              Verified Farmer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}