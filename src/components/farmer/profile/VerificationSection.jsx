import {
  BadgeCheck,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

export default function VerificationSection() {
  const verificationItems = [
    {
      title: "Identity Verification",
      status: "Verified",
      icon: BadgeCheck,
    },

    {
      title: "Farm Information",
      status: "Approved",
      icon: ShieldCheck,
    },

    {
      title: "Marketplace Eligibility",
      status: "Eligible",
      icon: FileCheck,
    },

    {
      title: "Profile Completion",
      status: "92% Completed",
      icon: CheckCircle2,
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
          from-[var(--primary)]/10
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
            Verification & Trust
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[var(--text-secondary)]
            "
          >
            Verified sellers gain more
            visibility and buyer trust
            across the marketplace.
          </p>
        </div>
      </div>

      {/* Verification Grid */}
      <div
        className="
          grid grid-cols-1
          gap-5
          p-6
          md:grid-cols-2
        "
      >
        {verificationItems.map(
          (item) => {
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
                  hover:border-[var(--primary)]/10
                "
              >
                
                <div className="flex items-start gap-4">
                  
                  {/* Icon */}
                  <div
                    className="
                      flex h-12 w-12
                      shrink-0
                      items-center justify-center
                      rounded-2xl
                      bg-[var(--primary)]/10
                      text-[var(--primary)]
                    "
                  >
                    <Icon size={22} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    
                    <p
                      className="
                        text-sm
                        text-[var(--text-secondary)]
                      "
                    >
                      {item.title}
                    </p>

                    <div
                      className="
                        mt-3
                        inline-flex items-center
                        rounded-full
                        bg-emerald-500/10
                        px-3 py-1
                        text-sm font-semibold
                        text-emerald-600
                      "
                    >
                      {item.status}
                    </div>
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>

      {/* Footer */}
      <div
        className="
          border-t border-[var(--border)]
          bg-[var(--surface-2)]
          px-6 py-5
        "
      >
        
        <div
          className="
            flex flex-col gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          
          <div>
            
            <h3
              className="
                text-base font-semibold
                text-[var(--text-primary)]
              "
            >
              Marketplace Trust Score
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-[var(--text-secondary)]
              "
            >
              Verified sellers receive
              higher visibility and buyer
              confidence within F2CMARKET.
            </p>
          </div>

          {/* Score */}
          <div
            className="
              inline-flex items-center
              justify-center
              rounded-2xl
              bg-emerald-500
              px-5 py-3
              text-lg font-bold
              text-white
              shadow-sm
            "
          >
            94%
          </div>
        </div>
      </div>
    </section>
  );
}