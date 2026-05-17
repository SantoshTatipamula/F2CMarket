const STORAGE_KEY = "f2c-user";

/* Get current user */
export function getStoredUser() {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY)
  );
}

/* Save updated user */
export function saveUser(user) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  );

  return user;
}

/* Update user */
export function updateStoredUser(
  updatedData
) {
  const currentUser =
    getStoredUser();

  if (!currentUser) return null;

  const updatedUser = {
    ...currentUser,
    ...updatedData,
  };

  saveUser(updatedUser);

  return updatedUser;
}