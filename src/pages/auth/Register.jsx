import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInputField from "@/components/auth/AuthInputField";
import { AuthDivider, GoogleButton } from "@/components/auth/AuthExtras";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const passwordsMatch =
    form.confirmPassword === "" || form.password === form.confirmPassword;

  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.password.trim() &&
    form.confirmPassword.trim() &&
    form.password === form.confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    if (!isValid) return;
    login({ email: form.email });
    navigate("/");
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join F2CMARKET today">
      <AuthInputField
        icon={User}
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
      />

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

      <AuthInputField
        icon={Lock}
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      {!passwordsMatch && (
        <p className="text-xs text-red-400">Passwords do not match</p>
      )}

      <Button
        onClick={handleRegister}
        disabled={!isValid}
        className={`w-full h-11 rounded-xl font-semibold ${
          isValid
            ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        Create Account
      </Button>

      <AuthDivider />
      <GoogleButton />

      <p className="text-center text-sm text-[var(--glass-text-muted)]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
