import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const LOCATION_COLLECTION = "locations";

export async function getLocationFromFirestore(userId) {
  if (!userId) return null;

  const snapshot = await getDoc(doc(db, LOCATION_COLLECTION, String(userId)));
  if (!snapshot.exists()) return null;

  return snapshot.data()?.selectedLocation || null;
}

export async function saveLocationToFirestore(userId, selectedLocation) {
  if (!userId) return;

  const ref = doc(db, LOCATION_COLLECTION, String(userId));
  await setDoc(
    ref,
    { selectedLocation: JSON.parse(JSON.stringify(selectedLocation || null)) },
    { merge: true },
  );
}
