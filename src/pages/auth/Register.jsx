import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import bgImage from "@/assets/images/farm.webp";
import google from "@/assets/icons/google.png";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

    // Simulate account creation
    login({ email: form.email });

    navigate("/");
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 font-[Poppins]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-3xl backdrop-blur-xl shadow-2xl p-8 space-y-6 bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--glass-text)]">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p className="text-sm text-[var(--glass-text-muted)] mt-1">
              Join F2CMARKET today
            </p>
          </div>

          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-2 h-4 w-4 text-[var(--glass-text-muted)]" />

            <Input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="pl-10 bg-[var(--glass-input)] border-[var(--glass-border)] text-[var(--glass-text)] placeholder:text-[var(--glass-text-muted)]"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-2 h-4 w-4 text-[var(--glass-text-muted)]" />

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="pl-10 bg-[var(--glass-input)] border-[var(--glass-border)] text-[var(--glass-text)] placeholder:text-[var(--glass-text-muted)]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-2 h-4 w-4 text-[var(--glass-text-muted)]" />

            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="pl-10 pr-10 bg-[var(--glass-input)] border-[var(--glass-border)] text-[var(--glass-text)] placeholder:text-[var(--glass-text-muted)]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-[var(--glass-text-muted)]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-2 h-4 w-4 text-[var(--glass-text-muted)]" />

            <Input
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="pl-10 pr-10 bg-[var(--glass-input)] border-[var(--glass-border)] text-[var(--glass-text)] placeholder:text-[var(--glass-text-muted)]"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2 text-[var(--glass-text-muted)]"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Password mismatch warning */}
          {form.confirmPassword && form.password !== form.confirmPassword && (
            <p className="text-xs text-red-400">
              Passwords do not match
            </p>
          )}

          {/* Register Button */}
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

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--glass-border)]" />
            <span className="text-xs text-[var(--glass-text-muted)]">OR</span>
            <div className="flex-1 h-px bg-[var(--glass-border)]" />
          </div>

          {/* Google */}
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl flex items-center justify-center gap-2 border-[var(--glass-border)] bg-[var(--glass-input)] hover:bg-[var(--glass-bg)] text-[var(--glass-text)]"
          >
            <img src={google} alt="google" className="h-5 w-5" />
            Continue with Google
          </Button>

          {/* Login Link */}
          <p className="text-center text-sm text-[var(--glass-text-muted)]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}