import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import { auth } from "@/config/firebase";

const googleProvider = new GoogleAuthProvider();

export const registerWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logoutUser = () => signOut(auth);

export { onAuthStateChanged };

export const changeUserPassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("User not authenticated.");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  // Verify current password
  await reauthenticateWithCredential(user, credential);

  // Update password in Firebase
  await updatePassword(user, newPassword);
};
