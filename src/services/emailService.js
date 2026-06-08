import emailjs from "@emailjs/browser";

/* ======================================================
   EMAILJS CONFIG
====================================================== */

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";

const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

/* ======================================================
   INTERNAL SEND HELPER
====================================================== */

async function send(params) {
  if (!SERVICE_ID || !PUBLIC_KEY || !TEMPLATE_ID) {
    console.warn("EmailJS not configured");
    return {
      success: false,
      reason: "not_configured",
    };
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);

    return {
      success: true,
    };
  } catch (error) {
    console.error("EmailJS Error:", error);

    return {
      success: false,
      reason: error?.text || "unknown",
    };
  }
}

/* ======================================================
   GENERIC EMAIL
====================================================== */

export async function sendGenericEmail({ name, email, subject, message }) {
  return send({
    name,
    email,
    subject,
    message,
  });
}

/* ======================================================
   WELCOME EMAIL
====================================================== */

export async function sendWelcomeEmail({ name, email, role }) {
  const roleMessage =
    role === "farmer"
      ? "Your farmer account has been received and is currently under review."
      : "You can now start exploring fresh products from local farmers.";

  return sendGenericEmail({
    name,
    email,
    subject: "Welcome to F2CMARKET 🌿",
    message: `
Thank you for joining F2CMARKET.

${roleMessage}

We are excited to connect farmers and consumers directly through our platform.

Happy Shopping!

F2CMARKET Team
    `,
  });
}

/* ======================================================
   ORDER CONFIRMATION
====================================================== */

export async function sendOrderConfirmationEmail({ name, email, order }) {
  const itemsList = (order?.items || [])
    .map((item) => `${item.name} × ${item.quantity} — ₹${item.subtotal}`)
    .join("\n");

  return sendGenericEmail({
    name,
    email,
    subject: `Order Confirmation #${order.id}`,
    message: `
Your order has been placed successfully.

Order ID:
${order.id}

Items:
${itemsList}

Total:
₹${order.total}

Thank you for shopping with F2CMARKET 🌿
    `,
  });
}

/* ======================================================
   DELIVERY STATUS
====================================================== */

export async function sendDeliveryStatusEmail({
  name,
  email,
  orderId,
  status,
}) {
  const messages = {
    Accepted: "Your order has been accepted and is being prepared.",

    Packed: "Your order has been packed and is ready for dispatch.",

    Shipped: "Your order has been shipped and is on its way.",

    Delivered: "Your order has been delivered successfully.",

    Cancelled: "Your order has been cancelled.",
  };

  return sendGenericEmail({
    name,
    email,
    subject: `Order ${status} - #${orderId}`,
    message: `
Order ID: ${orderId}

${messages[status] || "Order status updated."}

Thank you for choosing F2CMARKET.
    `,
  });
}

/* ======================================================
   PASSWORD RESET
====================================================== */

export async function sendPasswordResetEmail({ name, email, resetCode }) {
  return sendGenericEmail({
    name,
    email,
    subject: "Password Reset Request",
    message: `
Hello ${name},

Use the verification code below to reset your password:

${resetCode}

This code will expire in 15 minutes.

If you did not request this reset, please ignore this email.
    `,
  });
}

/* ======================================================
   FEEDBACK EMAIL
====================================================== */

export async function sendFeedbackEmail({ name, email }) {
  return sendGenericEmail({
    name,
    email,
    subject: "Feedback Received",
    message: `
Thank you for sharing your feedback.

We appreciate your support and will use your suggestions to improve F2CMARKET.

Have a wonderful day! 🌿
    `,
  });
}

/* ======================================================
   SUPPORT EMAIL
====================================================== */

export async function sendSupportEmail({ name, email }) {
  return sendGenericEmail({
    name,
    email,
    subject: "Support Request Received",
    message: `
We have successfully received your support request.

Our team will review your message and get back to you as soon as possible.

Thank you for contacting F2CMARKET.
    `,
  });
}

/* ======================================================
   CONFIG CHECK
====================================================== */

export const isEmailConfigured = () =>
  !!(SERVICE_ID && PUBLIC_KEY && TEMPLATE_ID);
