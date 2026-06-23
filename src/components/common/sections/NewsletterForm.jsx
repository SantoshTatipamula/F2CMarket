import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

import emailjs from "@emailjs/browser";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

 async function handleSubscribe(e) {
  e.preventDefault();

  if (!email.trim()) {
    toast.error("Please enter your email address.");
    return;
  }

  try {
    setLoading(true);

    await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    to_email: email, // MUST MATCH TEMPLATE

    to_name: "Subscriber",

    subject: "Welcome to F2CMARKET 🌱",

    message: `
Thank you for subscribing to F2CMARKET.

You will now receive:

🌾 Seasonal offers
🥬 Fresh product updates
🚜 Farmer announcements
🎉 Exclusive promotions

Thank you for supporting local farmers.

Team F2CMARKET
    `,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);

    toast.success("Successfully subscribed!");

    setEmail("");
  } catch (error) {
    console.error(error);

    toast.error("Subscription failed. Please try again.");
  } finally {
    setLoading(false);
  }
}

  return (
    <form
      onSubmit={handleSubscribe}
      className="bg-[var(--bg)] rounded-3xl p-4 md:p-5 shadow-xl"
    >
      <div className="relative">
        <Mail
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="
            w-full h-14
            pl-12 pr-4
            rounded-2xl
            border border-[var(--border)]
            outline-none
            focus:border-green-500
            text-[var(--text-secondary)]
          "
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          mt-4 w-full h-14
          rounded-2xl
          bg-[var(--primary)]
          hover:bg-[var(--primary-hover)]
          text-white font-semibold
          flex items-center justify-center gap-2
          transition
          disabled:opacity-60
        "
      >
        <Send size={18} />

        {loading ? "Subscribing..." : "Subscribe Now"}
      </button>

      <p className="mt-3 text-xs text-[var(--text-muted)] text-center">
        No spam. Only useful updates and offers.
      </p>
    </form>
  );
}