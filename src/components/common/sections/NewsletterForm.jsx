import { Mail, Send } from "lucide-react";

export default function NewsletterForm() {
  return (
    <div className="bg-[var(--bg)] rounded-3xl p-4 md:p-5 shadow-xl">

      <div className="relative">
        <Mail
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]"
        />

        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full h-14 pl-12 pr-4 rounded-2xl border border-[var(--border)] outline-none focus:border-green-500 text-[var(--text-secondary)]"
        />
      </div>

      <button className="mt-4 w-full h-14 rounded-2xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold flex items-center justify-center gap-2 transition">
        <Send size={18} />
        Subscribe Now
      </button>

      <p className="mt-3 text-xs text-[var(--text-muted)] text-center">
        No spam. Only useful updates and offers.
      </p>

    </div>
  );
}