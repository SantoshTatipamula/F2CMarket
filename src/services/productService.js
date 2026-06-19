import { productsData } from "@/data/productsData";

const STORAGE_KEY = "f2c-products";

/* Initialize products */
export function initializeProducts() {
  const existingProducts = localStorage.getItem(STORAGE_KEY);

  if (!existingProducts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productsData));
  }
}

/* Get all products */
export function getProducts() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

/* Save all products */
export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/* Add product */
export function addProduct(newProduct) {
  const products = getProducts();

  const updatedProducts = [newProduct, ...products];

  saveProducts(updatedProducts);

  return updatedProducts;
}

/* Update product */
export function updateProduct(productId, updatedData, currentUserId) {
  const products = getProducts();

  const existingProduct = products.find(
    (product) => product.id.toString() === productId.toString(),
  );

  // Authorization check
  if (!existingProduct || existingProduct.sellerId !== currentUserId) {
    return null;
  }

  const updatedProducts = products.map((product) =>
    product.id.toString() === productId.toString()
      ? {
          ...product,
          ...updatedData,

          id: product.id,

          sellerId: product.sellerId,

          sellerName: product.sellerName,

          sellerRole: product.sellerRole,
        }
      : product,
  );

  saveProducts(updatedProducts);

  return updatedProducts.find(
    (product) => product.id.toString() === productId.toString(),
  );
}

/* Delete product */
export function deleteProduct(productId, currentUserId) {
  const products = getProducts();

  const existingProduct = products.find(
    (product) => product.id.toString() === productId.toString(),
  );

  // Authorization check
  if (!existingProduct || existingProduct.sellerId !== currentUserId) {
    return products;
  }

  const updatedProducts = products.filter(
    (product) => product.id.toString() !== productId.toString(),
  );

  saveProducts(updatedProducts);

  return updatedProducts;
}

/* Get seller products */
export function getSellerProducts(sellerId) {
  return getProducts().filter((product) => product.sellerId === sellerId);
}

/* Get single product */
export function getProductById(productId) {
  return getProducts().find(
    (product) => product.id.toString() === productId.toString(),
  );
}

/* Create product */
export function createProduct(productData) {
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

    id: crypto.randomUUID(),

    createdAt: new Date().toISOString(),

    status: "active",

    totalOrders: 0,
  };

  const updatedProducts = [newProduct, ...products];

  saveProducts(updatedProducts);

  return newProduct;
}
