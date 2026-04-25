// src/components/productDetails/TrustIndicators.jsx

const TRUST_ITEMS = [
  {
    title: "100% Fresh Guarantee",
    subtitle: "Direct from farm to your door",
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    title: "Same Day Delivery",
    subtitle: "Order before 2 PM",
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    title: "Easy Returns",
    subtitle: "7-day return policy",
    bg: "bg-orange-100",
    text: "text-orange-600",
  },
];

export default function TrustIndicators() {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-bold text-[var(--text-primary)]">
        Why Buy From Us
      </h3>

      <div className="grid gap-3">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${item.bg} ${item.text} text-xs font-bold`}
            >
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {item.title}
              </p>
              <p className="text-xs text-[var(--text-muted)]">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}