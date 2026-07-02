import { Component } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

/**
 * Reusable Error Boundary.
 *
 * Catches unexpected render/lifecycle crashes anywhere below it in the tree
 * and shows a branded fallback UI instead of a blank white screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <SomeComponent />
 *   </ErrorBoundary>
 *
 * Optional props:
 *   - fallbackTitle / fallbackMessage: override the copy for a specific area
 *   - onReset: called when the user clicks "Try Again" (e.g. to reset local state)
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log for diagnostics. Swap for a remote logging service if/when one is added.
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    // Full reload clears any corrupted in-memory state (safest recovery path).
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  handleTryAgain = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] w-full flex items-center justify-center bg-[var(--surface)] px-4 py-16">
          <div className="max-w-md w-full bg-white border border-[var(--border)] rounded-3xl shadow-md p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 bg-red-50">
              <AlertTriangle size={30} className="text-[var(--error)]" />
            </div>

            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {this.props.fallbackTitle || "Something went wrong"}
            </h2>

            <p className="mt-2 max-w-sm text-[var(--text-secondary)]">
              {this.props.fallbackMessage ||
                "This part of the page ran into an unexpected error. You can try again, reload the page, or head back home."}
            </p>

            {import.meta.env.DEV && this.state.error && (
              <pre className="mt-4 w-full max-h-32 overflow-auto text-left text-xs text-[var(--error)] bg-red-50 rounded-xl p-3">
                {String(this.state.error?.message || this.state.error)}
              </pre>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={this.handleTryAgain}
                className="inline-flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-2xl border border-[var(--border-strong)] text-[var(--text-primary)] font-medium hover:bg-[var(--surface-2)] transition"
              >
                <RefreshCw size={16} />
                Try Again
              </button>

              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 flex-1 px-5 py-3 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium transition"
              >
                <RefreshCw size={16} />
                Reload Page
              </button>
            </div>

            <button
              onClick={this.handleGoHome}
              className="mt-3 inline-flex items-center justify-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
            >
              <Home size={14} />
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
