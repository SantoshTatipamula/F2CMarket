/**
 * Strips currency symbols and non-numeric characters from a price string,
 * returning a clean numeric value.
 *
 * @param {string|number} price  e.g. "₹40", "40.50", 40
 * @returns {number}
 */
export function parsePrice(price) {
  return Number(String(price).replace(/[^\d.]/g, "")) || 0;
}
