import {
  FileText,
  User,
  Tractor,
  CreditCard,
  RefreshCw,
  ShieldAlert,
  Pencil,
} from "lucide-react";

const termsSections = [
  {
    title: "Acceptance of Terms",
    description:
      "By accessing and using F2CMARKET, users agree to comply with these terms and all applicable policies.",
    icon: FileText,
  },
  {
    title: "User Responsibilities",
    description:
      "Users must provide accurate information and use the platform responsibly and lawfully.",
    icon: User,
  },
  {
    title: "Farmer Responsibilities",
    description:
      "Farmers are responsible for maintaining accurate product listings, pricing, and availability.",
    icon: Tractor,
  },
  {
    title: "Orders & Payments",
    description:
      "Orders and payments are subject to platform rules, availability, and applicable payment policies.",
    icon: CreditCard,
  },
  {
    title: "Cancellation & Refunds",
    description:
      "Cancellation and refund eligibility may vary depending on order status and marketplace policies.",
    icon: RefreshCw,
  },
  {
    title: "Limitation of Liability",
    description:
      "F2CMARKET is not liable for losses resulting from misuse of the platform or circumstances beyond our control.",
    icon: ShieldAlert,
  },
  {
    title: "Changes to Terms",
    description:
      "We may update these terms periodically. Continued use of the platform indicates acceptance of changes.",
    icon: Pencil,
  },
];

export default function TermsContent() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-5">
          {termsSections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="
                  bg-white
                  border border-[var(--border)]
                  rounded-2xl
                  p-5 md:p-6
                  hover:border-[var(--primary)]
                  hover:shadow-md
                  transition-all
                  duration-300
                "
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                    <Icon
                      size={22}
                      className="text-[var(--primary)]"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {section.title}
                    </h3>

                    <p className="mt-2 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}