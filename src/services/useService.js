import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

import { db } from "@/config/firebase";

/* Save User */
export const saveUserToFirestore = async (user) => {
  await setDoc(doc(db, "users", user.id), user);
};

/* Get Single User */
export const getUserFromFirestore = async (userId) => {
  const snapshot = await getDoc(doc(db, "users", userId));

  if (!snapshot.exists()) return null;

  return snapshot.data();
};

/* Get All Users */
export const getAllUsersFromFirestore = async () => {
  const snapshot = await getDocs(collection(db, "users"));

  return snapshot.docs.map((doc) => doc.data());
};