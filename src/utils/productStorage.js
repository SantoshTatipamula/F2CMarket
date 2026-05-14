import { farmerProductsData } from "@/data/farmerProductsData";

const STORAGE_KEY = "f2c-products";

/**
 * Initialize products once
 */
export function initializeProducts() {
  const existingProducts =
    localStorage.getItem(STORAGE_KEY);

  if (!existingProducts) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(farmerProductsData)
    );
  }
}

/**
 * Get all products
 */
export function getProducts() {
  return (
    JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) || []
  );
}

/**
 * Save products
 */
export function saveProducts(products) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );
}