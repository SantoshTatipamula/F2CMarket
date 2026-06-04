/**
 * initSeedData.js
 * ─────────────────────────────────────────────────────────────────
 * Initializes localStorage with temp data on first app load.
 * Only seeds if data doesn't already exist — safe to keep in production.
 * Remove this file when switching to Firebase.
 */

import { SEED_USERS, SEED_PRODUCTS, SEED_ORDERS, SEED_NOTIFICATIONS } from "@/data/seedData";

const FLAG_KEY = "f2c-seeded-v1";

export function initSeedData() {
  /* Already seeded — skip */
  if (localStorage.getItem(FLAG_KEY)) return;

  /* Users */
  const existingUsers = JSON.parse(localStorage.getItem("f2c-users")) || [];
  if (existingUsers.length === 0) {
    localStorage.setItem("f2c-users", JSON.stringify(SEED_USERS));
  }

  /* Products */
  const existingProducts = JSON.parse(localStorage.getItem("f2c-products")) || [];
  if (existingProducts.length === 0) {
    localStorage.setItem("f2c-products", JSON.stringify(SEED_PRODUCTS));
  }

  /* Orders */
  const existingOrders = JSON.parse(localStorage.getItem("f2c-orders")) || [];
  if (existingOrders.length === 0) {
    localStorage.setItem("f2c-orders", JSON.stringify(SEED_ORDERS));
  }

  /* Notifications */
  const existingNotifs = JSON.parse(localStorage.getItem("f2c-notifications")) || [];
  if (existingNotifs.length === 0) {
    localStorage.setItem("f2c-notifications", JSON.stringify(SEED_NOTIFICATIONS));
  }

  /* Mark as seeded */
  localStorage.setItem(FLAG_KEY, "true");
  console.log("%c✅ F2CMARKET seed data initialized", "color:#16A34A;font-weight:bold");
}

/** Force re-seed (clears everything and reseeds) */
export function resetSeedData() {
  localStorage.removeItem(FLAG_KEY);
  localStorage.removeItem("f2c-users");
  localStorage.removeItem("f2c-products");
  localStorage.removeItem("f2c-orders");
  localStorage.removeItem("f2c-notifications");
  localStorage.removeItem("f2c-user");
  localStorage.removeItem("f2c-cart");
  localStorage.removeItem("f2c-wishlist");
  initSeedData();
  console.log("%c🔄 F2CMARKET data reset and reseeded", "color:#F59E0B;font-weight:bold");
}
