import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import FeedbackForm from "@/components/feedback/FeedbackForm";


export default function Feedback() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
        <div
          className="
            overflow-hidden
            rounded-3xl
            border border-[var(--border)]
            bg-[var(--surface)]
            shadow-sm
          "
        >
          {/* Hero */}
          <div
            className="
              bg-gradient-to-br
              from-[var(--primary)]
              via-[var(--primary)]/90
              to-emerald-500
              px-8 py-10
              text-white
            "
          >
            <span
              className="
                inline-flex rounded-full
                bg-white/10
                px-4 py-1.5
                text-sm font-semibold
              "
            >
              Customer Feedback
            </span>

            <h1 className="mt-6 text-4xl font-bold">
              Help Us Improve
            </h1>

            <p className="mt-4 max-w-2xl text-white/80">
              Your feedback helps us improve F2CMARKET
              and deliver a better experience for farmers
              and consumers.
            </p>
          </div>

          {/* Form will come here */}
          <div className="p-6 md:p-8">
            <FeedbackForm />
          </div>
        </div>
      </section>
    </main>
  );
}