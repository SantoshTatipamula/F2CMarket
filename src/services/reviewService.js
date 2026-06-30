import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/config/firebase";

/* Add Review */
export const addReview = async (review) => {
  const docRef = await addDoc(
    collection(db, "productReviews"),
    {
      ...review,
      createdAt: serverTimestamp(),
    }
  );

  return docRef.id;
};

/* Get Reviews of Product */
export const getProductReviews = async (productId) => {
  const q = query(
    collection(db, "productReviews"),
    where("productId", "==", productId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export const hasUserReviewed = async (
  productId,
  consumerId
) => {
  const q = query(
    collection(db, "productReviews"),
    where("productId", "==", productId),
    where("consumerId", "==", consumerId)
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
};

export async function getTopReviews(limit = 6) {
  const snapshot = await getDocs(
    collection(db, "productReviews")
  );

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((review) => review.rating >= 4)
    .sort((a, b) => {
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }

      const aTime =
        a.createdAt?.toMillis?.() || 0;

      const bTime =
        b.createdAt?.toMillis?.() || 0;

      return bTime - aTime;
    })
    .slice(0, limit);
}

export async function getSellerReviews(
  farmerId
) {
  const q = query(
    collection(db, "productReviews"),
    where(
      "farmerId",
      "==",
      String(farmerId)
    )
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => {
      const aTime =
        a.createdAt?.toMillis?.() || 0;

      const bTime =
        b.createdAt?.toMillis?.() || 0;

      return bTime - aTime;
    });
}