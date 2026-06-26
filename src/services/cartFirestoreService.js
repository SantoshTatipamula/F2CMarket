import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const CART_COLLECTION = "carts";

export async function getCartFromFirestore(userId) {
  if (!userId) return [];

  const snapshot = await getDoc(doc(db, CART_COLLECTION, String(userId)));
  if (!snapshot.exists()) return [];

  const data = snapshot.data();
  return Array.isArray(data.items) ? data.items : [];
}

export async function saveCartToFirestore(userId, items) {
  if (!userId) return;

  const ref = doc(db, CART_COLLECTION, String(userId));
  await setDoc(
    ref,
    { items: JSON.parse(JSON.stringify(items || [])) },
    { merge: true },
  );
}
