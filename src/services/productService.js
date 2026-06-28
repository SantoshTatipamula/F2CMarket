import {
  fetchProducts,
  addProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
} from "@/services/productFirestoreService";

/* Load all products from Firestore */
export async function loadProducts() {
  return await fetchProducts();
}

/* Get single product */
export async function getProductById(productId) {
  const products = await fetchProducts();

  return products.find(
    (product) => String(product.id) === String(productId)
  );
}

/* Sync farmer profile changes across products */
export async function syncFarmerProducts(farmerId, updates) {
  const products = await fetchProducts();

  const farmerProducts = products.filter(
    (product) => String(product.farmerId) === String(farmerId)
  );

  await Promise.all(
    farmerProducts.map((product) =>
      updateProductInFirestore(product.id, {
        ...product,
        ...updates,
      })
    )
  );
}

/* Get farmer products */
export async function getSellerProducts(farmerId) {
  const products = await fetchProducts();

  return products.filter(
    (product) =>
      String(product.farmerId) === String(farmerId)
  );
}

/* Create product */
export async function createProduct(productData) {
  const newProduct = {
    ...productData,

    location:
      productData.location ||
      productData.farmLocation?.city ||
      "Karimnagar",

    farmer:
      productData.farmer ||
      productData.farmerName ||
      "Local Farmer",

    farmerId: productData.farmerId || "",

    farmerName:
      productData.farmerName ||
      productData.farmer ||
      "",

    farmName: productData.farmName || "",

    farmLocation: productData.farmLocation || null,

    farmerAvatar: productData.farmerAvatar || "",

    stock: productData.stock || 0,

    stockUnit: productData.stockUnit || "kg",

    rating: 4.5,

    id: productData.id || crypto.randomUUID(),

    createdAt:
      productData.createdAt ||
      new Date().toISOString(),

    status: "active",

    totalOrders: 0,
  };

  await addProductToFirestore(newProduct);

  return newProduct;
}

/* Update product */
export async function updateProduct(
  productId,
  updatedData,
  currentUserId
) {
  const products = await fetchProducts();

  const existingProduct = products.find(
    (product) =>
      String(product.id) === String(productId)
  );

  if (
    !existingProduct ||
    String(existingProduct.farmerId) !==
      String(currentUserId)
  ) {
    return null;
  }

  const merged = {
    ...existingProduct,
    ...updatedData,
    id: existingProduct.id,
    farmerId: existingProduct.farmerId,
    farmerName: existingProduct.farmerName,
  };

  await updateProductInFirestore(
    productId,
    merged
  );

  return merged;
}

/* Delete product */
export async function deleteProduct(
  productId,
  currentUserId
) {
  const products = await fetchProducts();

  const existingProduct = products.find(
    (product) =>
      String(product.id) === String(productId)
  );

  if (
    !existingProduct ||
    String(existingProduct.farmerId) !==
      String(currentUserId)
  ) {
    return null;
  }

  await deleteProductFromFirestore(productId);

  return products.filter(
    (product) =>
      String(product.id) !== String(productId)
  );
}

/* Admin delete */
export async function deleteProductAsAdmin(
  productId
) {
  await deleteProductFromFirestore(productId);
}