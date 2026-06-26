import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/config/firebase";

/* Save User */
export const saveUserToFirestore = async (user) => {
  await setDoc(
    doc(db, "users", user.id),
    user,
    { merge: true }
  );
};

/* Update User */
export const updateUserInFirestore = async (
  userId,
  updatedData
) => {
  const ref = doc(db, "users", userId);

  await updateDoc(ref, {
    ...updatedData,
  });
};

/* Get Single User */
export const getUserFromFirestore = async (userId) => {
  const snapshot = await getDoc(
    doc(db, "users", userId)
  );

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

/* Get All Users */
export const getAllUsersFromFirestore = async () => {
  const snapshot = await getDocs(
    collection(db, "users")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};