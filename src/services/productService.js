import { farmerProductsData } from "@/data/farmerProductsData";

const STORAGE_KEY =
  "f2c-products";

/* Initialize products */
export function initializeProducts() {
  const existingProducts =
    localStorage.getItem(STORAGE_KEY);

  if (!existingProducts) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        farmerProductsData
      )
    );
  }
}

/* Get all products */
export function getProducts() {
  return (
    JSON.parse(
      localStorage.getItem(
        STORAGE_KEY
      )
    ) || []
  );
}

/* Save all products */
export function saveProducts(
  products
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(products)
  );
}

/* Add product */
export function addProduct(
  newProduct
) {
  const products =
    getProducts();

  const updatedProducts = [
    newProduct,
    ...products,
  ];

  saveProducts(updatedProducts);

  return updatedProducts;
}

/* Update product */
export function updateProduct(
  productId,
  updatedData
) {
  const products =
    getProducts();

  const updatedProducts =
    products.map((product) =>
      product.id.toString() ===
      productId.toString()
        ? {
            ...product,
            ...updatedData,
            id: product.id,
          }
        : product
    );

  saveProducts(updatedProducts);

  return updatedProducts.find(
    (product) =>
      product.id.toString() ===
      productId.toString()
  );
}

/* Delete product */
export function deleteProduct(
  productId
) {
  const products =
    getProducts();

  const updatedProducts =
    products.filter(
      (product) =>
        product.id !== productId
    );

  saveProducts(updatedProducts);

  return updatedProducts;
}

/* Get products by farmer */
export function getFarmerProducts(
  farmerId
) {
  return getProducts().filter(
    (product) =>
      product.farmerId === farmerId
  );
}

/* Get single product */
export function getProductById(
  productId
) {
  return getProducts().find(
    (product) =>
      product.id.toString() ===
      productId.toString()
  );
}


/* Create product */
export function createProduct(
  productData
) {
  const products =
    getProducts();

  const newProduct = {
    ...productData,

    id: crypto.randomUUID(),

    createdAt:
      new Date().toISOString(),

    status: "active",

    totalOrders: 0,
  };

  const updatedProducts = [
    newProduct,
    ...products,
  ];

  saveProducts(updatedProducts);

  return newProduct;
}