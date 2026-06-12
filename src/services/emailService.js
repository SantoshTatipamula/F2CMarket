/**
 * emailService.js
 * ─────────────────────────────────────────────────────────────────
 * All emails go through ONE generic EmailJS template.
 * Template variables: {{to_name}}, {{to_email}}, {{subject}}, {{message}}
 *
 * Credentials stored in .env:
 *   VITE_EMAILJS_SERVICE_ID=service_8wpsoj2
 *   VITE_EMAILJS_TEMPLATE_ID=template_w7kve6o
 *   VITE_EMAILJS_PUBLIC_KEY=HTcVeGmKtGMMuds_g
 */

import emailjs from "@emailjs/browser";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || "";

/* ── Core send ──────────────────────────────────────────────────── */
async function send({ name, email, subject, message }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS not configured — skipping email to:", email);
    console.log(`%c📧 [DEV] To: ${email}\nSubject: ${subject}\n${message}`, "color:#16A34A");
    return { success: false, reason: "not_configured" };
  }
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      { to_name: name, to_email: email, subject, message },
      PUBLIC_KEY
    );
    return { success: true };
  } catch (err) {
    console.error("EmailJS error:", err);
    return { success: false, reason: err?.text || "unknown" };
  }
}

/* ── Public API ─────────────────────────────────────────────────── */

/** Generic email — use for any custom message */
export const sendGenericEmail = ({ name, email, subject, message }) =>
  send({ name, email, subject, message });

/** Welcome email after registration */
export function sendWelcomeEmail({ name, email, role }) {
  const roleMsg = role === "farmer"
    ? "Your farmer account is under admin verification. You will be notified once approved."
    : "You can now browse fresh products from verified local farmers.";

  return send({
    name,
    email,
    subject: "Welcome to F2CMARKET! 🌱",
    message: `Hi ${name},\n\nWelcome to F2CMARKET — your direct link to fresh farm produce!\n\n${roleMsg}\n\nVisit us at: ${typeof window !== "undefined" ? window.location.origin : "https://f2cmarket.com"}\n\nHappy shopping!\nF2CMARKET Team`,
  });
}

/** Order confirmation after checkout */
export function sendOrderConfirmationEmail({ name, email, order }) {
  if (!email) return Promise.resolve({ success: false });

  const slotMap = {
    morning:   "Morning (7 AM – 12 PM)",
    afternoon: "Afternoon (12 PM – 5 PM)",
    evening:   "Evening (5 PM – 9 PM)",
  };

  const itemsList = (order?.items || [])
    .map(i => `• ${i.name} x${i.quantity} — ₹${i.subtotal}`)
    .join("\n");

  const estDate = order?.estimatedDelivery
    ? new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      })
    : "Within 2 business days";

  return send({
    name,
    email,
    subject: `Order Confirmed #${order?.id} — F2CMARKET`,
    message: `Hi ${name},\n\nYour order has been placed successfully! 🎉\n\nOrder ID: ${order?.id}\nTotal: ₹${order?.total}\n\nItems Ordered:\n${itemsList}\n\nDelivery Slot: ${slotMap[order?.deliverySlot] || "Standard"}\nEstimated Delivery: ${estDate}\nDelivery Address: ${order?.consumer?.address || ""}\nPayment: ${(order?.paymentMethod || "").toUpperCase()}\n\nTrack your order at: ${typeof window !== "undefined" ? window.location.origin : ""}/orders\n\nThank you for shopping with F2CMARKET!\nF2CMARKET Team`,
  });
}

/** Delivery status update email */
export function sendDeliveryStatusEmail({ name, email, orderId, status }) {
  if (!email) return Promise.resolve({ success: false });

  const messages = {
    Accepted:  "Great news! Your order has been accepted by the farmer and is being prepared.",
    Packed:    "Your order is packed and ready for dispatch. It will be picked up soon.",
    Shipped:   "Your order is out for delivery! Expect it at your doorstep very soon. 🚚",
    Delivered: "Your order has been delivered successfully. Enjoy your fresh produce! 🌱",
    Cancelled: "Your order has been cancelled. If you have questions, contact support@f2cmarket.com.",
  };

  if (!messages[status]) return Promise.resolve({ success: false });

  return send({
    name,
    email,
    subject: `Order ${status} — #${orderId} | F2CMARKET`,
    message: `Hi ${name},\n\n${messages[status]}\n\nOrder ID: ${orderId}\n\nTrack all your orders at: ${typeof window !== "undefined" ? window.location.origin : ""}/orders\n\nF2CMARKET Team`,
  });
}

/** Password reset code email */
export function sendPasswordResetEmail({ name, email, resetCode }) {
  return send({
    name,
    email,
    subject: "Password Reset Code — F2CMARKET",
    message: `Hi ${name},\n\nYou requested a password reset for your F2CMARKET account.\n\nYour reset code is:\n\n🔑  ${resetCode}  \n\nThis code expires in 15 minutes.\n\nIf you did not request this, please ignore this email.\n\nF2CMARKET Team`,
  });
}

/** Support/contact form email */
export function sendSupportEmail({ name, email, message }) {
  return send({
    name,
    email,
    subject: "We received your message — F2CMARKET Support",
    message: `Hi ${name},\n\nThank you for contacting F2CMARKET support!\n\nWe have received your message and will get back to you within 24-48 hours.\n\nYour message:\n"${message}"\n\nFor urgent issues, email us directly at support@f2cmarket.com.\n\nF2CMARKET Team`,
  });
}

export const isEmailConfigured = () => !!(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);
