export default function FarmersPageHeader() {
  return (
    <section className="space-y-4 text-center max-w-3xl mx-auto">
      
      <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm font-medium text-[var(--primary)]">
        Trusted Local Farmers
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
        Meet the Farmers Behind Your Food
      </h1>

      <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed">
        Discover passionate farmers delivering fresh produce directly to consumers through F2CMARKET.
      </p>
    </section>
  );
}