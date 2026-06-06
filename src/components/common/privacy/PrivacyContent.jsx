import {
  Database,
  Lock,
  Cookie,
  UserCheck,
  Mail,
  Shield,
} from "lucide-react";

const privacySections = [
  {
    title: "Information We Collect",
    description:
      "We may collect your name, email address, phone number, profile information, and order details to provide marketplace services.",
    icon: Database,
  },
  {
    title: "How We Use Information",
    description:
      "Information is used to process orders, improve user experience, communicate updates, and provide customer support.",
    icon: UserCheck,
  },
  {
    title: "Data Protection",
    description:
      "We implement security measures to protect user data from unauthorized access, misuse, or disclosure.",
    icon: Lock,
  },
  {
    title: "Cookies & Tracking",
    description:
      "Cookies may be used to improve website functionality, remember preferences, and analyze platform usage.",
    icon: Cookie,
  },
  {
    title: "Your Rights",
    description:
      "Users can review, update, or request removal of personal information in accordance with applicable regulations.",
    icon: Shield,
  },
  {
    title: "Contact Information",
    description:
      "For privacy-related concerns, users may contact F2CMARKET support through the Contact Us page.",
    icon: Mail,
  },
];

export default function PrivacyContent() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-5">
          {privacySections.map((section) => {
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
                  <div
                    className="
                      w-12 h-12
                      rounded-xl
                      bg-green-100
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
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