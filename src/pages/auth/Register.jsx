import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Users } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInputField from "@/components/auth/AuthInputField";
import AuthSelectField from "@/components/auth/AuthSelectField";
import { AuthDivider, GoogleButton } from "@/components/auth/AuthExtras";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "consumer",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (error) setError("");
  };

  const handleRegister = () => {
    if (!isValid || loading) return;

    setError("");
    setLoading(true);

    const existingUsers = JSON.parse(localStorage.getItem("f2c-users")) || [];
    const emailExists = existingUsers.some((user) => user.email === form.email);

    if (emailExists) {
      setError("An account with this email already exists.");
      setLoading(false);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
      createdAt: new Date().toISOString(),
    };

    register(newUser);

    if (form.role === "consumer") navigate("/");
    else if (form.role === "farmer") navigate("/farmer/dashboard");

    setLoading(false);
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

      <AuthSelectField
        icon={Users}
        name="role"
        value={form.role}
        onChange={handleChange}
        options={[
          { label: "Consumer", value: "consumer" },
          { label: "Farmer",   value: "farmer"   },
        ]}
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
        <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2.5">
          <p className="text-xs font-medium text-red-300">Passwords do not match</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2.5">
          <p className="text-xs font-medium text-red-300">{error}</p>
        </div>
      )}

      <Button
        onClick={handleRegister}
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
            Creating Account…
          </span>
        ) : "Create Account"}
      </Button>

      <AuthDivider />
      <GoogleButton />

      <p className="text-center text-sm text-[var(--glass-text-muted)]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold"
        >
          Login
        </Link>
      </p>

    </AuthLayout>
  );
}