/**
 * notificationService.js
 * ─────────────────────────────────────────────────────────────
 * In-app notification system backed by Firestore and local cache.
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

const KEY = "f2c-notifications";
const NOTIFICATIONS_COLLECTION = "notifications";

async function fetchNotificationsFromFirestore(userId) {
  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function fetchAllNotificationsFromFirestore() {
  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    orderBy("createdAt", "desc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}

async function saveNotificationToFirestore(notification) {
  const ref = doc(db, NOTIFICATIONS_COLLECTION, String(notification.id));
  await setDoc(ref, JSON.parse(JSON.stringify(notification)));
}

async function updateNotificationInFirestore(notificationId, data) {
  const ref = doc(db, NOTIFICATIONS_COLLECTION, String(notificationId));
  await updateDoc(ref, JSON.parse(JSON.stringify(data)));
}

async function deleteNotificationFromFirestore(notificationId) {
  await deleteDoc(doc(db, NOTIFICATIONS_COLLECTION, String(notificationId)));
}

async function clearNotificationsInFirestore(userId) {
  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    where("userId", "==", userId),
  );
  const snapshot = await getDocs(q);

  await Promise.all(
    snapshot.docs.map((docItem) => deleteDoc(docItem.ref)),
  );
}

export async function initializeNotifications(userId) {
  if (!userId) return;

  try {
    const notifications = await fetchNotificationsFromFirestore(userId);
    localStorage.setItem(KEY, JSON.stringify(notifications));
  } catch (error) {
    console.error("Failed to initialize notifications from Firestore:", error);
  }
}

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
export async function addNotification({ userId, type, title, message, orderId = null }) {
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

  try {
    await saveNotificationToFirestore(notification);
  } catch (error) {
    console.error("Failed to persist notification to Firestore:", error);
  }

  return notification;
}

/** Mark a single notification as read */
export async function markAsRead(notificationId) {
  const next = readAll().map((n) =>
    n.id === notificationId ? { ...n, read: true } : n
  );
  writeAll(next);

  try {
    await updateNotificationInFirestore(notificationId, { read: true });
  } catch (error) {
    console.error("Failed to update notification read status in Firestore:", error);
  }
}

/** Mark all notifications as read for a user */
export async function markAllAsRead(userId) {
  const next = readAll().map((n) =>
    n.userId === userId ? { ...n, read: true } : n
  );
  writeAll(next);

  try {
    const q = query(
      collection(db, NOTIFICATIONS_COLLECTION),
      where("userId", "==", userId),
      where("read", "==", false),
    );
    const snapshot = await getDocs(q);

    await Promise.all(
      snapshot.docs.map((docItem) =>
        updateDoc(docItem.ref, { read: true }),
      ),
    );
  } catch (error) {
    console.error("Failed to mark all notifications as read in Firestore:", error);
  }
}

/** Delete a single notification */
export async function deleteNotification(notificationId) {
  writeAll(readAll().filter((n) => n.id !== notificationId));

  try {
    await deleteNotificationFromFirestore(notificationId);
  } catch (error) {
    console.error("Failed to delete notification from Firestore:", error);
  }
}

/** Clear all notifications for a user */
export async function clearNotifications(userId) {
  writeAll(readAll().filter((n) => n.userId !== userId));

  try {
    await clearNotificationsInFirestore(userId);
  } catch (error) {
    console.error("Failed to clear notifications from Firestore:", error);
  }
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
