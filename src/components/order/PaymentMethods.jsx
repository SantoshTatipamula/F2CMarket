import { Card, CardContent } from "@/components/ui/card";

const methods = [
  {
    id: "cod",
    title: "Cash on Delivery",
    desc: "Pay after your order arrives.",
    enabled: true,
  },
  {
    id: "upi",
    title: "UPI Payment",
    desc: "Google Pay, PhonePe, Paytm.",
    enabled: false,
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    desc: "Secure online payment.",
    enabled: false,
  },
];

export default function PaymentMethods({ selectedMethod, setSelectedMethod }) {
  return (
    <Card className="rounded-2xl border-[var(--border)] shadow-sm">
      <CardContent className="p-6 space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Payment Method
          </h2>

          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Choose how you’d like to pay.
          </p>
        </div>

        <div className="space-y-3">
          {methods.map((method) => {
            const active = selectedMethod === method.id;
            const disabled = !method.enabled;

            return (
              <button
                key={method.id}
                type="button"
                onClick={() => {
                  if (!disabled) {
                    setSelectedMethod(method.id);
                  }
                }}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  disabled
                    ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                    : active
                      ? "border-[var(--primary)] bg-green-50"
                      : "border-[var(--border)] hover:border-[var(--primary)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-4 w-4 rounded-full border flex items-center justify-center ${
                      active ? "border-[var(--primary)]" : "border-gray-400"
                    }`}
                  >
                    {active && (
                      <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                    )}
                  </div>

                  <div>
                    <p className="font-medium text-[var(--text-primary)]">
                      {method.title}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      {method.desc}
                    </p>
                    {!method.enabled && (
                      <span className="text-xs text-gray-400 ml-2">
                        (Coming soon)
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
