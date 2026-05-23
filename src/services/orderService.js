/**
 * orderService.js
 * ─────────────────────────────────────────────────────────────
 * Single source of truth for ALL order operations.
 * Currently backed by localStorage — swap internals for
 * Firestore later WITHOUT touching any UI component.
 *
 * Order shape:
 * {
 *   id:            "ORD-XXXXXX",
 *   consumerId:    string,
 *   consumer:      { name, phone, address },
 *   items: [{
 *     productId, farmerId, farmerName,
 *     name, image, quantity, price, subtotal
 *   }],
 *   totalItems:    number,
 *   subtotal:      number,
 *   deliveryFee:   number,
 *   total:         number,
 *   paymentMethod: string,
 *   paymentStatus: "Pending" | "Paid",
 *   orderStatus:   "Pending" | "Accepted" | "Packed" | "Shipped" | "Delivered" | "Cancelled",
 *   createdAt:     ISO string,
 * }
 */

const ORDERS_KEY = "f2c-orders";

/* ── Helpers ────────────────────────────────────────────────── */

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

/* ── Public API ─────────────────────────────────────────────── */

/** Return every order (newest first) */
export function getOrders() {
  return readAll().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

/** Return orders placed by a specific consumer */
export function getConsumerOrders(consumerId) {
  return getOrders().filter((o) => o.consumerId === consumerId);
}

/**
 * Return orders that contain at least one item belonging to a farmer.
 * Each returned order is trimmed so `items` contains ONLY that farmer's items.
 */
export function getFarmerOrders(farmerId) {
  return getOrders()
    .filter((o) => o.items.some((item) => item.farmerId === farmerId))
    .map((o) => ({
      ...o,
      items: o.items.filter((item) => item.farmerId === farmerId),
    }));
}

/** Save a brand-new order, returns the saved order */
export function saveOrder(orderData) {
  const orders = readAll();
  const order = {
    ...orderData,
    id: generateOrderId(),
    orderStatus: "Pending",
    paymentStatus: orderData.paymentMethod === "cod" ? "Pending" : "Paid",
    createdAt: new Date().toISOString(),
  };
  writeAll([order, ...orders]);
  return order;
}

/** Update the status of a single order, returns updated order or null */
export function updateOrderStatus(orderId, newStatus) {
  const orders = readAll();
  let updated = null;

  const next = orders.map((o) => {
    if (o.id === orderId) {
      updated = { ...o, orderStatus: newStatus };
      return updated;
    }
    return o;
  });

  if (updated) writeAll(next);
  return updated;
}

/** Delete all orders (dev/testing helper) */
export function clearOrders() {
  localStorage.removeItem(ORDERS_KEY);
}

/** Build a well-shaped order object from checkout data */
export function buildOrder({ cartItems, formData, paymentMethod, user, deliveryFee }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.numericPrice ?? item.price) * item.quantity,
    0
  );

  const items = cartItems.map((item) => ({
    productId:  String(item.id),
    farmerId:   String(item.sellerId  || item.farmerId  || "unknown"),
    farmerName: item.sellerName || item.farmerName || item.farmer || "Local Farmer",
    name:       item.name,
    image:      item.image || "",
    quantity:   item.quantity,
    price:      item.numericPrice ?? item.price,
    subtotal:   (item.numericPrice ?? item.price) * item.quantity,
  }));

  return {
    consumerId: user?.id || "guest",
    consumer: {
      name:    formData.fullName,
      phone:   formData.phone,
      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
    },
    items,
    totalItems:    items.reduce((s, i) => s + i.quantity, 0),
    subtotal,
    deliveryFee,
    total:         subtotal + deliveryFee,
    paymentMethod,
  };
}
