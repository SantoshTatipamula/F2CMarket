import { Mail, Send } from "lucide-react";

export default function NewsletterForm() {
  return (
    <div className="bg-white rounded-3xl p-4 md:p-5 shadow-xl">

      <div className="relative">
        <Mail
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full h-14 pl-12 pr-4 rounded-2xl border border-slate-200 outline-none focus:border-green-500 text-slate-700"
        />
      </div>

      <button className="mt-4 w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 transition">
        <Send size={18} />
        Subscribe Now
      </button>

      <p className="mt-3 text-xs text-slate-500 text-center">
        No spam. Only useful updates and offers.
      </p>

    </div>
  );
}