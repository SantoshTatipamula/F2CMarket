/**
 * Full-screen page loader shown during route transitions or data fetching.
 * Uses a pulsing F2C brand mark so it feels native to the app.
 */
export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--bg)]">
      {/* Spinner ring */}
      <div className="relative flex items-center justify-center">
        <span className="block h-16 w-16 animate-spin rounded-full border-4 border-[var(--surface-2)] border-t-[var(--primary)]" />
        {/* Inner dot */}
        <span className="absolute h-4 w-4 rounded-full bg-[var(--primary)] animate-pulse" />
      </div>

      <p className="mt-5 text-sm font-semibold tracking-widest text-[var(--text-muted)] uppercase animate-pulse">
        Loading…
      </p>
    </div>
  );
}
