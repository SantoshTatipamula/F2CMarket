const STORAGE_KEY = "f2c-feedbacks";

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

  return newFeedback;
}