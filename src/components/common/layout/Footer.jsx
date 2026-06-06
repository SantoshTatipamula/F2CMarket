import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import logo from "../../../assets/logos/Logo.png";

import FooterColumn from "./FooterColumn";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const supportLinks = [
  { label: "Help Center", path: "/helpCenter" },
  { label: "Privacy Policy", path: "/privacyPolicy" },
  { label: "Terms & Conditions", path: "/termsConditions" },
  { label: "FAQs", path: "/faq" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-10 pb-5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 pb-10 border-b border-slate-800">
          {/* Brand */}
          <div>
            <img src={logo} alt="F2CMARKET" className="h-14 w-auto mb-5" />

            <p className="text-slate-300 leading-relaxed">
              Fresh farm products delivered directly from trusted local farmers
              to your home with quality, value and convenience.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                (Icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 rounded-full bg-[var(--text-primary)] border border-slate-800 hover:bg-[var(--primary)] transition flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links" links={quickLinks} />

          {/* Support */}
          <FooterColumn title="Support" links={supportLinks} />

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>

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
        <div className="pt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-[var(--text-light)] text-sm">
          <p>{"\u00A9"} 2026 F2CMARKET. All rights reserved.</p>
          <a href="/admin/login" className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-xs transition opacity-40 hover:opacity-100">
            Admin Portal
          </a>

          <p>Straight from the Soil, Right to your Table.</p>
        </div>
      </div>
    </footer>
  );
}
