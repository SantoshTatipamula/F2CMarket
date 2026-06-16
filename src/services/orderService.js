/**
 * orderService.js
 * Single source of truth for ALL order operations.
 * localStorage-backed — swap internals for Firestore later.
 */

import {
  notifyOrderPlaced,
  notifyOrderCancelled,
  notifyOrderStatusChanged,
} from "@/services/notificationService";
import {
  sendOrderConfirmationEmail,
  sendDeliveryStatusEmail,
} from "@/services/emailService";

const ORDERS_KEY = "f2c-orders";

/* ── Helpers ──────────────────────────────────────────────── */

function generateOrderId() {
  return "ORD-" + Math.floor(100000 + Math.random() * 900000);
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeAll(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

/* ── Public API ───────────────────────────────────────────── */

export function getOrders() {
  return readAll().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
}

export function getConsumerOrders(consumerId) {
  return getOrders().filter((o) => o.consumerId === consumerId);
}

export function getFarmerOrders(farmerId) {
  return getOrders()
    .filter((o) => o.items.some((item) => item.farmerId === farmerId))
    .map((o) => ({
      ...o,
      items: o.items.filter((item) => item.farmerId === farmerId),
    }));
}

/** Save a new order + fire order_placed notification */
export function saveOrder(orderData) {
  const orders = readAll();
  const order = {
    ...orderData,
    id: generateOrderId(),
    orderStatus: "Pending",
    paymentStatus: orderData.paymentMethod === "cod" ? "Pending" : "Paid",
    createdAt: new Date().toISOString(),
    estimatedDelivery: estimateDelivery(orderData.deliverySlot),
    statusHistory: [
      {
        status: "Pending",
        timestamp: new Date().toISOString(),
        note: "Order placed successfully",
      },
    ],
  };
  writeAll([order, ...orders]);

  /* In-app notification */
  notifyOrderPlaced(order.consumerId, order.id, order.total);

  /* Email confirmation (non-blocking) */
  const users = JSON.parse(localStorage.getItem("f2c-users") || "[]");
  const consumer = users.find((u) => u.id === order.consumerId);
  if (consumer?.email) {
    sendOrderConfirmationEmail({
      name: consumer.name,
      email: consumer.email,
      order,
    });
  }

  return order;
}

/** Update order status — fires notification to consumer */
export function updateOrderStatus(orderId, newStatus) {
  const orders = readAll();
  let updated = null;

  const statusNotes = {
    Accepted: "Order accepted by farmer",
    Packed: "Order packed and ready for dispatch",
    Shipped: "Order picked up and on the way",
    Delivered: "Order delivered successfully",
    Cancelled: "Order cancelled",
  };
  const next = orders.map((o) => {
    if (o.id === orderId) {
      const history = [
        ...(o.statusHistory || []),
        {
          status: newStatus,
          timestamp: new Date().toISOString(),
          note: statusNotes[newStatus] || `Status updated to ${newStatus}`,
        },
      ];
      updated = { ...o, orderStatus: newStatus, statusHistory: history };
      return updated;
    }
    return o;
  });

  if (updated) {
    writeAll(next);
    /* Notify consumer on meaningful status changes */
    const notifyStatuses = [
      "Accepted",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];
    if (notifyStatuses.includes(newStatus)) {
      if (newStatus === "Cancelled") {
        notifyOrderCancelled(updated.consumerId, orderId);
      } else {
        notifyOrderStatusChanged(updated.consumerId, orderId, newStatus);
      }
      /* Email delivery status update (non-blocking) */
      const users = JSON.parse(localStorage.getItem("f2c-users") || "[]");
      const consumer = users.find((u) => u.id === updated.consumerId);
      if (consumer?.email) {
        sendDeliveryStatusEmail({
          name: consumer.name,
          email: consumer.email,
          orderId,
          status: newStatus,
        });
      }
    }
  }

  return updated;
}

/** Consumer cancels their own order (only if Pending or Accepted) */
export function cancelOrder(orderId) {
  const orders = readAll();
  let updated = null;

  const next = orders.map((o) => {
    if (o.id === orderId && ["Pending", "Accepted"].includes(o.orderStatus)) {
      updated = { ...o, orderStatus: "Cancelled" };
      return updated;
    }
    return o;
  });

  if (updated) {
    writeAll(next);
    notifyOrderCancelled(updated.consumerId, orderId);
  }

  return updated;
}

export function clearOrders() {
  localStorage.removeItem(ORDERS_KEY);
}

/* Estimate delivery date based on slot */
function estimateDelivery(slot) {
  const d = new Date();
  d.setDate(d.getDate() + 2); // 2 days default
  return d.toISOString();
}

export function buildOrder({
  cartItems,
  formData,
  paymentMethod,
  user,
  deliveryFee,
  deliveryLocation,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.numericPrice ?? item.price) * item.quantity,
    0,
  );

  const items = cartItems.map((item) => ({
    productId: String(item.id),
    farmerId: String(item.sellerId || item.farmerId || "unknown"),
    farmerName:
      item.sellerName || item.farmerName || item.farmer || "Local Farmer",
    name: item.name,
    image: item.image || "",
    quantity: item.quantity,
    price: item.numericPrice ?? item.price,
    subtotal: (item.numericPrice ?? item.price) * item.quantity,
  }));

  return {
    consumerId: user?.id || "guest",
    consumer: {
      name: formData.fullName,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
    },

    deliveryLocation: {
      latitude: deliveryLocation?.latitude || null,
      longitude: deliveryLocation?.longitude || null,

      city: deliveryLocation?.city || "",
      district: deliveryLocation?.district || "",
      state: deliveryLocation?.state || "",
      country: deliveryLocation?.country || "",

      fullAddress: deliveryLocation?.fullAddress || "",
    },
    
    items,
    totalItems: items.reduce((s, i) => s + i.quantity, 0),
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    paymentMethod,
    deliverySlot: formData.deliverySlot || "morning",
  };
}
