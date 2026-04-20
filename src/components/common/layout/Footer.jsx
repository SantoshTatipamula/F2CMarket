import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn
} from "react-icons/fa";

import logo from "../../../assets/logos/Logo.png";

import FooterColumn from "./FooterColumn";

import { fadeUp } from "../../../utils/animations";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const supportLinks = [
  { label: "Help Center", path: "/help" },
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms & Conditions", path: "/terms" },
  { label: "FAQs", path: "/faq" },
];

export default function Footer() {
  return (
    <motion.footer
      className="bg-slate-950 text-white pt-20 pb-8 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={fadeUp}
    >

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-700 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 pb-14 border-b border-slate-800">

          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="F2CMARKET"
              className="h-14 w-auto mb-5"
            />

            <p className="text-slate-300 leading-relaxed">
              Fresh farm products delivered directly from trusted local farmers
              to your home with quality, value and convenience.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, index) => (
                <button
                  key={index}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:bg-green-600 transition flex items-center justify-center"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn
            title="Quick Links"
            links={quickLinks}
          />

          {/* Support */}
          <FooterColumn
            title="Support"
            links={supportLinks}
          />

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-slate-300">

              <div className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="mt-1 shrink-0" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} className="mt-1 shrink-0" />
                <span>support@f2cmarket.com</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">

          <p>
            © 2026 F2CMARKET. All rights reserved.
          </p>

          <p>
            Straight from the Soil, Right to your Table.
          </p>

        </div>

      </div>
    </motion.footer>
  );
}