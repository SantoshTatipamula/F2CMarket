import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    category: "Orders",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "Browse products, add items to your cart and complete checkout.",
      },
      {
        question: "Can I cancel an order?",
        answer:
          "Orders can be cancelled before processing begins.",
      },
      {
        question: "How do I view my order history?",
        answer:
          "Visit the Orders page to view all previous orders.",
      },
      {
        question: "Can I reorder a previous purchase?",
        answer:
          "Yes, use the reorder option available in your order history.",
      },
    ],
  },

  {
    category: "Payments",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer:
          "Currently we have only UPI and cash on delivery options.",
      },
      {
        question: "Are online payments secure?",
        answer:
          "Yes, payments are processed using secure payment methods.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refund eligibility depends on the order status and issue reported.",
      },
      {
        question: "Is cash on delivery available?",
        answer:
          "Cash on delivery may be available in selected locations.",
      },
    ],
  },

  {
    category: "Delivery",
    questions: [
      {
        question: "How long does delivery take?",
        answer:
          "Most orders are delivered within 24 to 48 hours.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes, order status can be tracked from the Orders page.",
      },
      {
        question: "What if I miss the delivery?",
        answer:
          "Our delivery team will attempt to contact you and reschedule.",
      },
      {
        question: "Do you deliver to all locations?",
        answer:
          "Currently, we are delivering only in Karimnagar and its surrounding areas.",
      },
    ],
  },

  {
    category: "Farmers",
    questions: [
      {
        question: "How do farmers register?",
        answer:
          "Farmers can register and submit verification documents for approval.",
      },
      {
        question: "How does verification work?",
        answer:
          "Our team reviews farmer details before granting selling access.",
      },
      {
        question: "Can farmers edit products?",
        answer:
          "Yes, farmers can add, edit and remove products anytime.",
      },
      {
        question: "How do farmers manage orders?",
        answer:
          "Orders can be managed directly from the farmer dashboard.",
      },
    ],
  },

  {
    category: "Products",
    questions: [
      {
        question: "Are products sourced directly from farmers?",
        answer:
          "Yes, products are listed and supplied by verified farmers.",
      },
      {
        question: "Are organic products available?",
        answer:
          "Yes, farmers can list organic products on the platform.",
      },
      {
        question: "Can I review products?",
        answer:
          "Customers can submit reviews after purchasing products.",
      },
      {
        question: "How often are products updated?",
        answer:
          "Farmers can update product availability anytime.",
      },
    ],
  },

  {
    category: "Account",
    questions: [
      {
        question: "How do I update my profile?",
        answer:
          "Profile information can be edited from the Profile page.",
      },
      {
        question: "How do I change my password?",
        answer:
          "Password settings are available under Security settings.",
      },
      {
        question: "Can I manage notifications?",
        answer:
          "Notification preferences can be changed from Settings.",
      },
      {
        question: "How do I logout?",
        answer:
          "Use the profile dropdown menu to logout securely.",
      },
    ],
  },
];

export default function FAQAccordion({selectedCategory}) {
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs =
  selectedCategory === "All"
    ? faqData
    : faqData.filter(
        (item) =>
          item.category === selectedCategory
      );

const allQuestions = filteredFaqs.flatMap(
  (section) =>
    section.questions.map((item) => ({
      ...item,
      category: section.category,
    }))
);
  

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--surface)]">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="space-y-4">
          {allQuestions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="
                  bg-white
                  border border-[var(--border)]
                  rounded-3xl
                  overflow-hidden
                  shadow-sm
                "
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-4
                    p-5 md:p-6
                    text-left
                  "
                >
                  <div>
                    <span className="text-xs font-medium text-[var(--primary)]">
                      {item.category}
                    </span>

                    <h3 className="mt-1 text-base md:text-lg font-semibold text-[var(--text-primary)]">
                      {item.question}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}