import {
  BadgeCheck,
  ShieldCheck,
  Truck,
  MessageCircleMore,
} from "lucide-react";

export default function SellerTrustCard() {
  const trustMetrics = [
    {
      title: "Verified Seller",
      value: "Approved",
      icon: BadgeCheck,
    },

    {
      title: "Order Fulfillment",
      value: "98%",
      icon: Truck,
    },

    {
      title: "Customer Rating",
      value: "4.9/5",
      icon: ShieldCheck,
    },

    {
      title: "Response Rate",
      value: "92%",
      icon: MessageCircleMore,
    },
  ];

  return (
    <section
      className="
        overflow-hidden
        rounded-3xl
        border border-black/5
        bg-[var(--surface)]
        shadow-sm
      "
    >
      
      {/* Header */}
      <div
        className="
          border-b border-[var(--border)]
          bg-gradient-to-r
          from-emerald-500/10
          via-transparent
          to-transparent
          px-6 py-5
        "
      >
        
        <div>
          
          <h2
            className="
              text-2xl font-bold
              tracking-tight
              text-[var(--text-primary)]
            "
          >
            Seller Trust & Reputation
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[var(--text-secondary)]
            "
          >
            Marketplace trust indicators
            help buyers purchase with
            confidence.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div
        className="
          grid grid-cols-1
          gap-5
          p-6
          sm:grid-cols-2
        "
      >
        {trustMetrics.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="
                rounded-2xl
                border border-black/5
                bg-[var(--surface-2)]
                p-5
                transition-all duration-300
                hover:border-emerald-500/10
              "
            >
              
              <div className="flex items-start justify-between gap-4">
                
                {/* Left */}
                <div>
                  
                  <p
                    className="
                      text-sm
                      text-[var(--text-secondary)]
                    "
                  >
                    {item.title}
                  </p>

                  <h3
                    className="
                      mt-3
                      text-2xl font-bold
                      tracking-tight
                      text-[var(--text-primary)]
                    "
                  >
                    {item.value}
                  </h3>
                </div>

                {/* Icon */}
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-2xl
                    bg-emerald-500/10
                    text-emerald-600
                  "
                >
                  <Icon size={22} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}