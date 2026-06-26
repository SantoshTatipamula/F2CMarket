import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const WISHLIST_COLLECTION = "wishlists";

export async function getWishlistFromFirestore(userId) {
  if (!userId) return [];

  const snapshot = await getDoc(doc(db, WISHLIST_COLLECTION, String(userId)));
  if (!snapshot.exists()) return [];

  const data = snapshot.data();
  return Array.isArray(data.items) ? data.items : [];
}

export async function saveWishlistToFirestore(userId, items) {
  if (!userId) return;

  const ref = doc(db, WISHLIST_COLLECTION, String(userId));
  await setDoc(
    ref,
    { items: JSON.parse(JSON.stringify(items || [])) },
    { merge: true },
  );
}
