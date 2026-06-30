export const validateName = (name) => {
  if (!name.trim()) return "Full name is required";

  if (name.trim().length < 3) {
    return "Name must be at least 3 characters";
  }

  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }

  return "";
};

export const validatePhone = (phone) => {
  if (!phone.trim()) return "Phone number is required";

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(phone)) {
    return "Please enter a valid 10-digit mobile number";
  }

  return "";
};

export const validateGovId = (govId) => {
  if (!govId.trim()) {
    return "Government ID is required";
  }

  return "";
};