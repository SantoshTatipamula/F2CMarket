// import { productsData } from "@/data/productsData";
import {
  fetchProducts,
  addProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
} from "@/services/productFirestoreService";

const STORAGE_KEY = "f2c-products";

/* Initialize local cache only */
export function initializeProducts() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
}

/* Get all products from localStorage cache */
export function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/* Save all products to localStorage cache */
export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/* Add product (legacy localStorage only) */
export function addProduct(newProduct) {
  const products = getProducts();
  const updatedProducts = [newProduct, ...products];
  saveProducts(updatedProducts);
  return updatedProducts;
}

/* Get single product from cache */
export function getProductById(productId) {
  return getProducts().find(
    (product) => String(product.id) === String(productId),
  );
}

/* Get seller products from cache */
export function getSellerProducts(sellerId) {
  return getProducts().filter((product) => product.sellerId === sellerId);
}

/* Load products from Firestore and cache to localStorage */
export async function loadProducts() {
  const products = await fetchProducts();
  saveProducts(products);
  return products;
}

/* Create product in Firestore + cache */
export async function createProduct(productData) {
  const products = getProducts();

  const newProduct = {
    ...productData,

    // Backward compatibility
    location:
      productData.location || productData.farmLocation?.city || "Karimnagar",

    farmer: productData.farmer || productData.farmerName || "Local Farmer",

    // New standardized fields
    farmerId: productData.farmerId || "",

    farmerName: productData.farmerName || productData.farmer || "",

    farmName: productData.farmName || "",

    farmLocation: productData.farmLocation || null,

    farmerAvatar: productData.farmerAvatar || "",

    // Product stock
    stock: productData.stock || 0,

    stockUnit: productData.stockUnit || "kg",

    rating: 4.5,

    id: productData.id || crypto.randomUUID(),

    createdAt: productData.createdAt || new Date().toISOString(),

    status: "active",

    totalOrders: 0,
  };

  await addProductToFirestore(newProduct);

  const updatedProducts = [newProduct, ...products];
  saveProducts(updatedProducts);

  return newProduct;
}

/* Update product in Firestore + cache */
export async function updateProduct(productId, updatedData, currentUserId) {
  const products = getProducts();

  const existingProduct = products.find(
    (product) => String(product.id) === String(productId),
  );

  // Authorization check
  if (!existingProduct || existingProduct.sellerId !== currentUserId) {
    return null;
  }

  const merged = {
    ...existingProduct,
    ...updatedData,

    id: existingProduct.id,

    sellerId: existingProduct.sellerId,

    sellerName: existingProduct.sellerName,

    sellerRole: existingProduct.sellerRole,
  };

  await updateProductInFirestore(productId, merged);

  const updatedProducts = products.map((product) =>
    String(product.id) === String(productId) ? merged : product,
  );

  saveProducts(updatedProducts);

  return merged;
}

/* Delete product in Firestore + cache */
export async function deleteProduct(productId, currentUserId) {
  const products = getProducts();

  const existingProduct = products.find(
    (product) => String(product.id) === String(productId),
  );

  // Authorization check
  if (!existingProduct || existingProduct.sellerId !== currentUserId) {
    return products;
  }

  await deleteProductFromFirestore(productId);

  const updatedProducts = products.filter(
    (product) => String(product.id) !== String(productId),
  );

  saveProducts(updatedProducts);

  return updatedProducts;
}

/* Admin delete without ownership check */
export async function deleteProductAsAdmin(productId) {
  const products = getProducts();

  await deleteProductFromFirestore(productId);

  const updatedProducts = products.filter(
    (product) => String(product.id) !== String(productId),
  );

  saveProducts(updatedProducts);

  return updatedProducts;
}