/**
 * notificationService.js
 * ─────────────────────────────────────────────────────────────
 * In-app notification system backed by localStorage.
 * Swap internals for Firebase later without touching UI.
 *
 * Notification shape:
 * {
 *   id:        string,
 *   userId:    string,
 *   type:      "order_placed" | "order_cancelled" | "order_status" | "general",
 *   title:     string,
 *   message:   string,
 *   orderId:   string | null,
 *   read:      boolean,
 *   createdAt: ISO string,
 * }
 */

const KEY = "f2c-notifications";

/* ── Helpers ────────────────────────────────────────────────── */

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function writeAll(notifications) {
  localStorage.setItem(KEY, JSON.stringify(notifications));
}

function generateId() {
  return "NOTIF-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

/* ── Public API ─────────────────────────────────────────────── */

/** Get all notifications for a user (newest first) */
export function getNotifications(userId) {
  return readAll()
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/** Get unread count for a user */
export function getUnreadCount(userId) {
  return readAll().filter((n) => n.userId === userId && !n.read).length;
}

/** Add a new notification */
export function addNotification({ userId, type, title, message, orderId = null }) {
  const notifications = readAll();
  const notification = {
    id:        generateId(),
    userId,
    type,
    title,
    message,
    orderId,
    read:      false,
    createdAt: new Date().toISOString(),
  };
  writeAll([notification, ...notifications]);
  return notification;
}

/** Mark a single notification as read */
export function markAsRead(notificationId) {
  const next = readAll().map((n) =>
    n.id === notificationId ? { ...n, read: true } : n
  );
  writeAll(next);
}

/** Mark all notifications as read for a user */
export function markAllAsRead(userId) {
  const next = readAll().map((n) =>
    n.userId === userId ? { ...n, read: true } : n
  );
  writeAll(next);
}

/** Delete a single notification */
export function deleteNotification(notificationId) {
  writeAll(readAll().filter((n) => n.id !== notificationId));
}

/** Clear all notifications for a user */
export function clearNotifications(userId) {
  writeAll(readAll().filter((n) => n.userId !== userId));
}

/* ── Event helpers — call these from orderService or UI ─────── */

export function notifyOrderPlaced(userId, orderId, total) {
  addNotification({
    userId,
    type:    "order_placed",
    title:   "Order Placed Successfully!",
    message: `Your order #${orderId} for ₹${total} has been placed. We'll notify you on updates.`,
    orderId,
  });
}

export function notifyOrderCancelled(userId, orderId) {
  addNotification({
    userId,
    type:    "order_cancelled",
    title:   "Order Cancelled",
    message: `Your order #${orderId} has been cancelled successfully.`,
    orderId,
  });
}

export function notifyOrderStatusChanged(userId, orderId, newStatus) {
  const messages = {
    Accepted:  `Your order #${orderId} has been accepted by the farmer.`,
    Packed:    `Your order #${orderId} is packed and ready for dispatch.`,
    Shipped:   `Your order #${orderId} is on the way! Expected delivery soon.`,
    Delivered: `Your order #${orderId} has been delivered. Enjoy your fresh produce!`,
  };

  addNotification({
    userId,
    type:    "order_status",
    title:   `Order ${newStatus}`,
    message: messages[newStatus] || `Your order #${orderId} status updated to ${newStatus}.`,
    orderId,
  });
}
