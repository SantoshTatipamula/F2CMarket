import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Generic error-state panel for failed Firestore fetches.
 * Mirrors EmptyState's visual language so "no data" and "fetch failed"
 * read as clearly different situations to the user.
 *
 * @param {string}   [title]        - Bold heading
 * @param {string}   [description]  - Supporting copy
 * @param {Function} [onRetry]      - Called when the user clicks "Try Again" (omit to hide button)
 */
export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this data. Please check your connection and try again.",
  onRetry,
}) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-3xl p-10 text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 bg-red-50">
        <AlertTriangle size={30} className="text-[var(--error)]" />
      </div>

      <h3 className="text-xl font-semibold text-[var(--text-primary)]">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-md text-[var(--text-secondary)]">
          {description}
        </p>
      )}

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}
