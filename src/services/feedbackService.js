import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const STORAGE_KEY = "f2c-feedbacks";
const FEEDBACK_COLLECTION = "feedbacks";

async function fetchFeedbacksFromFirestore() {
  const q = query(
    collection(db, FEEDBACK_COLLECTION),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
}

async function saveFeedbackToFirestore(feedback) {
  const ref = doc(db, FEEDBACK_COLLECTION, String(feedback.id));
  await setDoc(ref, JSON.parse(JSON.stringify(feedback)));
}

export async function initializeFeedbacks() {
  try {
    const feedbacks = await fetchFeedbacksFromFirestore();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
  } catch (error) {
    console.error("Failed to initialize feedbacks from Firestore:", error);
  }
}

export function getFeedbacks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveFeedback(feedback) {
  const feedbacks = getFeedbacks();

  const newFeedback = {
    id: crypto.randomUUID(),
    ...feedback,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([newFeedback, ...feedbacks])
  );

  saveFeedbackToFirestore(newFeedback).catch((error) => {
    console.error("Failed to persist feedback to Firestore:", error);
  });

  return newFeedback;
}
