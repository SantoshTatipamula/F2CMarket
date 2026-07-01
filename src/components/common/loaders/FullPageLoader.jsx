import { Loader2 } from "lucide-react";

export default function FullPageLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--surface)]">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <Loader2
            size={48}
            className="animate-spin text-[var(--primary)]"
          />

          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              F2CMARKET
            </h2>

            <p className="text-sm text-[var(--text-secondary)]">
              Loading fresh products...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}