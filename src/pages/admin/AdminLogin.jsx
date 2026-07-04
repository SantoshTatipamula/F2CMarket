import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const navigate       = useNavigate();
  const { login, logout } = useAuth();

  const [form,    setForm]    = useState({ email: "", password: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const isValid = form.email.trim() && form.password.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleLogin = async () => {
    if (!isValid || loading) return;
    setLoading(true);
    setError("");

    try {
      const result = await login(form.email.trim(), form.password);

      if (!result.success) {
        setError(result.error || "Invalid email or password.");
        return;
      }

      if (result.role !== "admin") {
        // login() already established a session for this (non-admin)
        // account — undo it so nobody ends up signed in via the wrong
        // portal, then send them back to the main site.
        await logout();
        setError("This portal is for admins only. Use the main login instead.");
        return;
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleLogin(); };

  const inputCls = "w-full h-12 pl-11 pr-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition";

  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)] text-white shadow-lg shadow-green-900/20 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Portal</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">F2CMARKET — Restricted Access</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[var(--border)] rounded-3xl shadow-sm p-7 space-y-4">

          {/* Email */}
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-[14px] text-[var(--text-muted)]" />
            <input name="email" type="email" placeholder="Admin Email"
              value={form.email} onChange={handleChange} onKeyDown={handleKeyDown}
              className={inputCls} />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-[14px] text-[var(--text-muted)]" />
            <input name="password" type="password" placeholder="Password"
              value={form.password} onChange={handleChange} onKeyDown={handleKeyDown}
              className={inputCls} />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-xs font-medium text-red-600 leading-5">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button onClick={handleLogin} disabled={!isValid || loading}
            className={`w-full h-12 rounded-xl font-semibold text-sm transition-all ${
              isValid && !loading
                ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-md shadow-green-900/20"
                : "bg-[var(--surface)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border)]"
            }`}>
            {loading
              ? <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Signing in…
                </span>
              : "Sign In to Admin"}
          </button>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          Not an admin?{" "}
          <a href="/login" className="text-[var(--primary)] hover:underline font-medium">
            Go to main login
          </a>
        </p>
      </div>
    </div>
  );
}
