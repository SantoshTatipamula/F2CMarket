import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { usersData } from "@/data/usersData";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInputField from "@/components/auth/AuthInputField";
import { AuthDivider, GoogleButton } from "@/components/auth/AuthExtras";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const from = location.state?.from?.pathname || "/";
  const isValid = form.email.trim() && form.password.trim();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleLogin = async () => {
  if (!isValid || loading) return;

  setLoading(true);
  setError("");

  setTimeout(() => {
    const foundUser = usersData.find(
      (user) =>
        user.email === form.email &&
        user.password === form.password
    );

    if (!foundUser) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    login(foundUser);

    // Redirect back to previous protected page
    navigate(from, { replace: true });

    setLoading(false);
  }, 800);
};
  return (
    <AuthLayout title="Login" subtitle="Connect to your source">
      <AuthInputField
        icon={Mail}
        name="email"
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
      />

      <AuthInputField
        icon={Lock}
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <div className="text-right text-sm">
        <button className="text-[var(--primary)] hover:text-[var(--primary-hover)] transition">
          Forgot Password?
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button
        onClick={handleLogin}
        disabled={!isValid || loading}
        className={`w-full h-11 rounded-xl font-semibold ${
          isValid
            ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <AuthDivider />
      <GoogleButton />

      <p className="text-center text-sm text-[var(--glass-text-muted)]">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
        >
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
