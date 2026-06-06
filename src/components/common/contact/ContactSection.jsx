import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ContactSection() {
  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Your message has been sent successfully.");

    e.target.reset();
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              rounded-3xl
              p-6 md:p-8 lg:p-10
              bg-gradient-to-br
              from-[var(--primary)]
              via-green-600
              to-green-700
              text-white
              overflow-hidden
              relative
            "
          >
            <div className="relative z-10">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-sm font-medium">
                Contact Information
              </span>

              <h2 className="mt-6 text-3xl md:text-4xl font-bold">
                Let's Talk
              </h2>

              <p className="mt-4 text-green-50 leading-relaxed">
                Have questions about products, farmers, orders, or partnerships?
                Our team is here to help.
              </p>

              <div className="mt-10 space-y-6">
                <ContactItem
                  icon={<MapPin size={20} />}
                  title="Address"
                  value="Hyderabad, Telangana, India"
                />

                <ContactItem
                  icon={<Phone size={20} />}
                  title="Phone"
                  value="+91 98765 43210"
                />

                <ContactItem
                  icon={<Mail size={20} />}
                  title="Email"
                  value="support@f2cmarket.com"
                />

                <ContactItem
                  icon={<Clock size={20} />}
                  title="Working Hours"
                  value="Mon - Sat, 9:00 AM - 6:00 PM"
                />
              </div>

              <div className="mt-10 pt-8 border-t border-white/20">
                <h3 className="font-semibold text-lg">
                  Need Immediate Help?
                </h3>

                <div className="mt-5 space-y-3">
                  <Link
                    to="/faq"
                    className="flex items-center gap-2 text-green-50 hover:text-white transition"
                  >
                    Frequently Asked Questions
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center gap-2 text-green-50 hover:text-white transition"
                  >
                    Visit Help Center
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              bg-white
              border border-[var(--border)]
              rounded-3xl
              p-5 md:p-8 lg:p-10
              shadow-sm
            "
          >
            <div className="mb-6 md:mb-8">
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">
                Send Us a Message
              </h2>

              <p className="mt-3 text-[var(--text-secondary)]">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="
                    w-full
                    rounded-2xl
                    border border-[var(--border)]
                    px-4 py-4
                    focus:border-[var(--primary)]
                    outline-none
                  "
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="
                    w-full
                    rounded-2xl
                    border border-[var(--border)]
                    px-4 py-4
                    focus:border-[var(--primary)]
                    outline-none
                  "
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                required
                className="
                  w-full
                  rounded-2xl
                  border border-[var(--border)]
                  px-4 py-4
                  focus:border-[var(--primary)]
                  outline-none
                "
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                required
                className="
                  w-full
                  rounded-2xl
                  border border-[var(--border)]
                  px-4 py-4
                  resize-none
                  focus:border-[var(--primary)]
                  outline-none
                "
              />

              <button
                type="submit"
                className="
                  w-full md:w-auto
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  bg-[var(--primary)]
                  hover:bg-[var(--primary-hover)]
                  text-white
                  font-semibold
                  px-8 py-4
                  rounded-2xl
                  transition
                "
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, title, value }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <p className="text-green-100 text-sm">{title}</p>
        <p className="font-medium break-words">{value}</p>
      </div>
    </div>
  );
}