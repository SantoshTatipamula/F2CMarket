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
      product.id === productId
        ? {
            ...product,
            ...updatedData,
          }
        : product
    );

  saveProducts(updatedProducts);

  return updatedProducts;
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