import {
  ArrowRight,
  Package,
  CreditCard,
  Tractor,
  User,
  ShoppingCart,
  Shield,
} from "lucide-react";

const resources = [
  {
    category: "Orders",
    title: "How to Place an Order",
    description:
      "Browse products, add items to your cart and complete checkout.",
    icon: Package,
  },
  {
    category: "Orders",
    title: "Track Your Order",
    description:
      "Monitor order progress from placement to delivery.",
    icon: Package,
  },
  {
    category: "Payments",
    title: "Payment Methods",
    description:
      "Learn about UPI, cards, net banking and supported payments.",
    icon: CreditCard,
  },
  {
    category: "Farmers",
    title: "Farmer Registration",
    description:
      "Understand the registration and verification process.",
    icon: Tractor,
  },
  {
    category: "Products",
    title: "Browse Products",
    description:
      "Explore categories and discover fresh farm products.",
    icon: ShoppingCart,
  },
  {
    category: "Account",
    title: "Manage Profile",
    description:
      "Update personal information and account settings.",
    icon: User,
  },
  {
    category: "Security",
    title: "Account Security",
    description:
      "Keep your account secure and protected.",
    icon: Shield,
  },
  {
    category: "Products",
    title: "Product Reviews",
    description:
      "Learn how reviews and ratings work on F2CMARKET.",
    icon: ShoppingCart,
  },
];

export default function HelpResources({
  selectedCategory,
}) {
  const filteredResources =
    selectedCategory === "All"
      ? resources
      : resources.filter(
          (item) =>
            item.category === selectedCategory
        );

  return (
    <section className="pb-12 md:pb-16 lg:pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-5">
          {filteredResources.map((resource) => {
            const Icon = resource.icon;

            return (
              <article
                key={resource.title}
                className="
                  bg-white
                  border
                  border-[var(--border)]
                  rounded-2xl
                  p-5
                  hover:border-[var(--primary)]
                  hover:shadow-md
                  transition-all
                  duration-300
                "
              >
                <div className="flex items-start gap-4">
                  <div
                    className="
                      w-11 h-11
                      rounded-xl
                      bg-green-100
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <Icon
                      size={20}
                      className="text-[var(--primary)]"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-xs font-medium text-[var(--primary)]">
                      {resource.category}
                    </span>

                    <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">
                      {resource.title}
                    </h3>

                    <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {resource.description}
                    </p>

                    <button
                      className="
                        mt-3
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-[var(--primary)]
                      "
                    >
                      Learn More
                      <ArrowRight size={14} />
                    </button>
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