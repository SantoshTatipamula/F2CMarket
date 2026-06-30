import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInputField from "@/components/auth/AuthInputField";
import { AuthDivider, GoogleButton } from "@/components/auth/AuthExtras";
import { validateEmail, validatePassword } from "@/pages/auth/authValidation";

function getRoleRedirect(result) {
  if (result.role === "farmer" && result.verificationStatus === "pending")
    return "/farmer/pending";
  const map = {
    consumer: "/",
    farmer: "/farmer/dashboard",
    admin: "/admin/dashboard",
  };
  return map[result.role] || "/";
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signInWithGoogle } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname;
  const isValid =
    form.email.trim() &&
    form.password.trim() &&
    !validateEmail(form.email) &&
    !validatePassword(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    let validationError = "";

    switch (name) {
      case "email":
        validationError = validateEmail(value);
        break;

      case "password":
        validationError = validatePassword(value);
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: validationError,
    }));

    if (error) setError("");
  };

  const handleLogin = async () => {
    if (!isValid || loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await login(form.email.trim(), form.password);

      if (!result.success) {
        setError(result.error);
        return;
      }

      navigate(from || getRoleRedirect(result), { replace: true });
    } catch (error) {
  switch (error.code) {
    case "auth/user-not-found":
      setError("No account found with this email.");
      break;

    case "auth/wrong-password":
      setError("Incorrect password.");
      break;

    case "auth/invalid-email":
      setError("Please enter a valid email address.");
      break;

    case "auth/too-many-requests":
      setError(
        "Too many failed attempts. Please try again later."
      );
      break;

    case "auth/network-request-failed":
      setError(
        "Network error. Please check your internet connection."
      );
      break;

    default:
      setError(error.message || "Login failed");
  }
} finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await signInWithGoogle();

      if (!result.success) {
        setError(result.error);
        return;
      }

      navigate(from || getRoleRedirect(result), { replace: true });
    } catch (error) {
      setError(error.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to your F2CMARKET account">
      <AuthInputField
        icon={Mail}
        name="email"
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {errors.email && (
        <p className="text-xs text-red-300 -mt-2 mb-2 px-1">{errors.email}</p>
      )}

      <AuthInputField
        icon={Lock}
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {errors.password && (
        <p className="text-xs text-red-300 -mt-2 mb-2 px-1">
          {errors.password}
        </p>
      )}

      {error && (
        <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-3">
          <p className="text-xs font-medium text-red-300 leading-5">{error}</p>
        </div>
      )}

      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] transition font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        onClick={handleLogin}
        disabled={!isValid || loading}
        className={`w-full h-11 rounded-xl font-semibold transition-all ${
          isValid && !loading
            ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg shadow-green-900/30"
            : "bg-white/10 text-white/40 cursor-not-allowed"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Logging in…
          </span>
        ) : (
          "Login"
        )}
      </Button>

      <AuthDivider />
      <GoogleButton onClick={handleGoogleLogin} />

      <p className="text-center text-sm text-[var(--glass-text-muted)]">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
