import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "@/config/firebase";

const PRODUCTS_COLLECTION = "products";

/* Get All Products */
export async function fetchProducts() {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);


    const products = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));


    return products;
  } catch (error) {
    console.error("Firestore Fetch Error:", error);
    return [];
  }
}

/* Get Single Product */
export async function getProductFromFirestore(productId) {
  const snapshot = await getDoc(
    doc(db, PRODUCTS_COLLECTION, String(productId)),
  );

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

/* Add Product */
export async function addProductToFirestore(product) {
  try {
    console.log("Saving Product:", product);
    console.log("Product ID:", product.id);
    console.log("ID Type:", typeof product.id);

    // Remove undefined values before saving
    const cleanProduct = JSON.parse(JSON.stringify(product));

    const ref = doc(
      db,
      PRODUCTS_COLLECTION,
      String(cleanProduct.id),
    );

    await setDoc(ref, cleanProduct);

    return {
      ...cleanProduct,
      id: ref.id,
    };
  } catch (error) {
    console.error("Failed to add product:", error);
    throw error;
  }
}

/* Update Product */
export async function updateProductInFirestore(
  productId,
  data,
) {
  try {
    const cleanData = JSON.parse(JSON.stringify(data));

    const ref = doc(
      db,
      PRODUCTS_COLLECTION,
      String(productId),
    );

    await updateDoc(ref, cleanData);
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
}

/* Delete Product */
export async function deleteProductFromFirestore(productId) {
  try {
    await deleteDoc(
      doc(db, PRODUCTS_COLLECTION, String(productId)),
    );
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error;
  }
}