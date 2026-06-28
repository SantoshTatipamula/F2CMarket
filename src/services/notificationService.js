import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "@/config/firebase";

const NOTIFICATIONS_COLLECTION = "notifications";

/* ───────────────────────────────────────────── */
/* Firestore Helpers                            */
/* ───────────────────────────────────────────── */

function generateId() {
  return (
    "NOTIF-" +
    Date.now() +
    "-" +
    Math.floor(Math.random() * 1000)
  );
}

export async function fetchNotificationsFromFirestore(userId) {
  if (!userId) return [];

  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
}

export async function fetchAllNotificationsFromFirestore() {
  const snapshot = await getDocs(
    collection(db, NOTIFICATIONS_COLLECTION)
  );

  return snapshot.docs
    .map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
}

/* ───────────────────────────────────────────── */
/* Public API                                   */
/* ───────────────────────────────────────────── */

export async function getNotifications(userId) {
  return await fetchNotificationsFromFirestore(userId);
}

export async function getUnreadCount(userId) {
  const notifications =
    await fetchNotificationsFromFirestore(userId);

  return notifications.filter(
    (notification) => !notification.read
  ).length;
}

export async function addNotification({
  userId,
  type,
  title,
  message,
  orderId = null,
}) {
  const notification = {
    id: generateId(),
    userId,
    type,
    title,
    message,
    orderId,
    read: false,
    createdAt: new Date().toISOString(),
  };

  await setDoc(
    doc(
      db,
      NOTIFICATIONS_COLLECTION,
      notification.id
    ),
    notification
  );

  return notification;
}

export async function markAsRead(notificationId) {
  await updateDoc(
    doc(
      db,
      NOTIFICATIONS_COLLECTION,
      notificationId
    ),
    {
      read: true,
    }
  );
}

export async function markAllAsRead(userId) {
  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    where("userId", "==", userId),
    where("read", "==", false)
  );

  const snapshot = await getDocs(q);

  await Promise.all(
    snapshot.docs.map((docItem) =>
      updateDoc(docItem.ref, {
        read: true,
      })
    )
  );
}

export async function deleteNotification(
  notificationId
) {
  await deleteDoc(
    doc(
      db,
      NOTIFICATIONS_COLLECTION,
      notificationId
    )
  );
}

export async function clearNotifications(userId) {
  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  await Promise.all(
    snapshot.docs.map((docItem) =>
      deleteDoc(docItem.ref)
    )
  );
}

/* ───────────────────────────────────────────── */
/* Event Helpers                                */
/* ───────────────────────────────────────────── */

export async function notifyOrderPlaced(
  userId,
  orderId,
  total
) {
  return addNotification({
    userId,
    type: "order_placed",
    title: "Order Placed Successfully!",
    message: `Your order #${orderId} for ₹${total} has been placed. We'll notify you on updates.`,
    orderId,
  });
}

export async function notifyOrderCancelled(
  userId,
  orderId
) {
  return addNotification({
    userId,
    type: "order_cancelled",
    title: "Order Cancelled",
    message: `Your order #${orderId} has been cancelled successfully.`,
    orderId,
  });
}

export async function notifyOrderStatusChanged(
  userId,
  orderId,
  newStatus
) {
  const messages = {
    Accepted:
      `Your order #${orderId} has been accepted by the farmer.`,

    Packed:
      `Your order #${orderId} is packed and ready for dispatch.`,

    Shipped:
      `Your order #${orderId} is on the way! Expected delivery soon.`,

    Delivered:
      `Your order #${orderId} has been delivered. Enjoy your fresh produce!`,
  };

  return addNotification({
    userId,
    type: "order_status",
    title: `Order ${newStatus}`,
    message:
      messages[newStatus] ||
      `Your order #${orderId} status updated to ${newStatus}.`,
    orderId,
  });
}

export async function notifyNewOrderForFarmer(
  userId,
  orderId,
  total
) {
  return addNotification({
    userId,
    type: "new_order",
    title: "New Order Received!",
    message: `You received a new order #${orderId} worth ₹${total}. Please review and update the order status.`,
    orderId,
  });
}