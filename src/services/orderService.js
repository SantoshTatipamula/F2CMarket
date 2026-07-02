/**
 * orderService.js
 * Single source of truth for ALL order operations.
 * Firestore-backed with local cache fallback.
 */

import {
  notifyOrderPlaced,
  notifyOrderCancelled,
  notifyOrderStatusChanged,
  notifyNewOrderForFarmer,
} from "@/services/notificationService";
import {
  sendOrderConfirmationEmail,
  sendDeliveryStatusEmail,
} from "@/services/emailService";
import { getUserFromFirestore } from "@/services/userService";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const ORDERS_KEY = "f2c-orders";
const ORDERS_COLLECTION = "orders";

export async function fetchOrdersForConsumerFromFirestore(consumerId) {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where("consumerId", "==", consumerId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
}

export async function fetchOrdersForFarmerFromFirestore(farmerId) {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where("farmerIds", "array-contains", farmerId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
}

async function saveOrderToFirestore(order) {
  const ref = doc(db, ORDERS_COLLECTION, String(order.id));
  await setDoc(ref, JSON.parse(JSON.stringify(order)));
}

async function updateOrderInFirestore(orderId, data) {
  const ref = doc(db, ORDERS_COLLECTION, String(orderId));
  await updateDoc(ref, JSON.parse(JSON.stringify(data)));
}

export async function initializeOrders(userId, role) {
  if (!userId || !role) return;

  try {
    const orders =
      role === "farmer"
        ? await fetchOrdersForFarmerFromFirestore(userId)
        : await fetchOrdersForConsumerFromFirestore(userId);

    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Failed to initialize orders from Firestore:", error);
  }
}

/**
 * Fetch this user's orders straight from Firestore, refresh the local
 * cache, and return them — used by pages that need a real loading/error
 * state instead of just reading whatever's already cached locally.
 * Throws on failure so callers can show an error UI; the local cache is
 * left untouched on failure so a transient error doesn't wipe good data.
 */
export async function refreshOrdersFromFirestore(userId, role) {
  if (!userId || !role) return [];

  const orders =
    role === "farmer"
      ? await fetchOrdersForFarmerFromFirestore(userId)
      : await fetchOrdersForConsumerFromFirestore(userId);

  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  return orders;
}

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
export async function saveOrder(orderData) {
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
    farmerIds: Array.from(
      new Set((orderData.items || []).map((item) => String(item.farmerId)))
    ),
  };
  writeAll([order, ...orders]);

  try {
    await saveOrderToFirestore(order);
  } catch (error) {
    console.error("Failed to persist order to Firestore:", error);
  }

  /* In-app notification */
  notifyOrderPlaced(order.consumerId, order.id, order.total);

  const farmerIds = Array.from(
  new Set(
    (order.items || []).map((item) =>
      String(item.farmerId)
    )
  )
);

for (const farmerId of farmerIds) {
  notifyNewOrderForFarmer(
    farmerId,
    order.id,
    order.total
  );
}

  /* Email confirmation (non-blocking) */
  try {
    const consumer = await getUserFromFirestore(order.consumerId);
    if (consumer?.email) {
      sendOrderConfirmationEmail({
        name: consumer.name,
        email: consumer.email,
        order,
      });
    }
  } catch (error) {
    console.error("Failed to load consumer profile for order confirmation email:", error);
  }

  return order;
}

/** Update order status — fires notification to consumer */
export async function updateOrderStatus(orderId, newStatus) {
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

    try {
      await updateOrderInFirestore(orderId, updated);
    } catch (error) {
      console.error("Failed to update order status in Firestore:", error);
    }

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
      try {
        const consumer = await getUserFromFirestore(updated.consumerId);
        if (consumer?.email) {
          sendDeliveryStatusEmail({
            name: consumer.name,
            email: consumer.email,
            orderId,
            status: newStatus,
          });
        }
      } catch (error) {
        console.error("Failed to load consumer profile for delivery status email:", error);
      }
    }
  }

  return updated;
}

/** Consumer cancels their own order (only if Pending or Accepted) */
export async function cancelOrder(orderId) {
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

    try {
      await updateOrderInFirestore(updated.id, updated);
    } catch (error) {
      console.error("Failed to persist cancelled order to Firestore:", error);
    }

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
