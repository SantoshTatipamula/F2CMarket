import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import bgImage from "@/assets/images/farm.webp";
import google from "@/assets/icons/google.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const isValid = form.email.trim() && form.password.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    if (!isValid) return;

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
        <div className="rounded-3xl border  backdrop-blur-xl shadow-2xl p-8 space-y-6 bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--glass-text)]">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold mt-1">Login</h1>
            <p className="text-sm text-[var(--glass-text-muted)] mt-1">
              Connect to your source
            </p>
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
              className="pl-10 pr-10 bg-[var(--glass-input)] border-[var(--glass-border)] text-[var(--glass-text)] placeholder:text-[var(--glass-text-muted)]"
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
              className="absolute right-3 top-2 text-white/70"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <button className="text-[var(--primary)] hover:text-[var(--primary-hover)] transition">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={!isValid}
            className={`w-full h-11 rounded-xl font-semibold ${
              isValid
                ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Login
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--glass-border)]" />
            <span className="text-xs text-[var(--glass-text-muted)]">OR</span>
            <div className="flex-1 h-px bg-[var(--glass-border)]" />
          </div>

          {/* Google Login */}
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl flex items-center justify-center gap-2 border-white/30 bg-white/20 hover:bg-white/30 text-white"
          >
            <img
              src={google}
              alt="google"
              className="h-5 w-5"
            />

            Continue with Google
          </Button>

          {/* Register */}
          <p className="text-center text-sm text-[var(--glass-text-muted)]">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
