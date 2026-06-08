import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, KeyRound, Lock, CheckCircle2, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { sendPasswordResetEmail } from "@/services/emailService";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInputField from "@/components/auth/AuthInputField";
import { Button } from "@/components/ui/button";

/* Generate 6-digit code */
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/* Store reset code in localStorage with expiry */
function saveResetCode(email, code) {
  const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes
  localStorage.setItem("f2c-reset", JSON.stringify({ email, code, expiry }));
}

function verifyResetCode(email, code) {
  try {
    const stored = JSON.parse(localStorage.getItem("f2c-reset"));
    if (!stored) return { valid: false, error: "No reset request found." };
    if (stored.email !== email) return { valid: false, error: "Email mismatch." };
    if (Date.now() > stored.expiry) return { valid: false, error: "Code expired. Please request a new one." };
    if (stored.code !== code) return { valid: false, error: "Incorrect code. Please try again." };
    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid reset session." };
  }
}

export default function ForgotPassword() {
  const { users, updateUserInList } = useAuth();

  /* step: "email" | "code" | "password" | "done" */
  const [step,     setStep]     = useState("email");
  const [email,    setEmail]    = useState("");
  const [code,     setCode]     = useState("");
  const [newPass,  setNewPass]  = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  /* ── Step 1 — Send code ── */
  const handleSendCode = async () => {
    setError("");
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) { setError("Please enter your email."); return; }

    const user = users.find(u => u.email.toLowerCase() === trimmed);
    if (!user) { setError("No account found with this email."); return; }

    setLoading(true);
    const resetCode = generateCode();
    saveResetCode(trimmed, resetCode);

    const result = await sendPasswordResetEmail({
      name:      user.name,
      email:     trimmed,
      resetCode,
    });

    setLoading(false);

    if (result.success || result.reason === "not_configured") {
      /* In dev (emailjs not configured) show code in console for testing */
      if (result.reason === "not_configured") {
        console.log(`%c🔑 Reset code for ${trimmed}: ${resetCode}`, "color:#16A34A;font-size:14px;font-weight:bold;");
        console.log("(EmailJS not configured — code shown in console for dev testing)");
      }
      setStep("code");
    } else {
      setError("Failed to send email. Please try again.");
    }
  };

  /* ── Step 2 — Verify code ── */
  const handleVerifyCode = () => {
    setError("");
    const result = verifyResetCode(email.trim().toLowerCase(), code.trim());
    if (!result.valid) { setError(result.error); return; }
    setStep("password");
  };

  /* ── Step 3 — Reset password ── */
  const handleResetPassword = () => {
    setError("");
    if (newPass.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPass !== confirm) { setError("Passwords do not match."); return; }

    const trimmedEmail = email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === trimmedEmail);
    if (!user) { setError("User not found."); return; }

    updateUserInList({ ...user, password: newPass });
    localStorage.removeItem("f2c-reset");
    setStep("done");
  };

  const stepTitles = {
    email:    "Forgot Password",
    code:     "Enter Reset Code",
    password: "Set New Password",
    done:     "Password Reset!",
  };

  const stepSubs = {
    email:    "Enter your registered email address",
    code:     `We sent a 6-digit code to ${email}`,
    password: "Choose a strong new password",
    done:     "Your password has been updated",
  };

  return (
    <AuthLayout title={stepTitles[step]} subtitle={stepSubs[step]}>

      {/* ── Step 1 — Email ── */}
      {step === "email" && (
        <>
          <AuthInputField
            icon={Mail} name="email" type="email"
            placeholder="Your registered email"
            value={email}
            onChange={e => { setEmail(e.target.value); setError(""); }}
          />

          {error && (
            <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2.5">
              <p className="text-xs font-medium text-red-300">{error}</p>
            </div>
          )}

          <Button
            onClick={handleSendCode}
            disabled={!email.trim() || loading}
            className={`w-full h-11 rounded-xl font-semibold transition-all ${
              email.trim() && !loading
                ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg shadow-green-900/30"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
          >
            {loading
              ? <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Sending code…
                </span>
              : "Send Reset Code"
            }
          </Button>

          <p className="text-center text-sm text-[var(--glass-text-muted)]">
            Remember your password?{" "}
            <Link to="/login" className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold">
              Login
            </Link>
          </p>
        </>
      )}

      {/* ── Step 2 — Enter code ── */}
      {step === "code" && (
        <>
          <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
            <p className="text-xs text-[var(--glass-text-muted)] leading-5">
              A 6-digit code was sent to <span className="font-semibold text-[var(--glass-text)]">{email}</span>.
              Check your inbox. <br />
              <span className="text-amber-300">
                If EmailJS is not set up yet, check the browser console for the code.
              </span>
            </p>
          </div>

          <AuthInputField
            icon={KeyRound} name="code"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={e => { setCode(e.target.value); setError(""); }}
          />

          {error && (
            <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2.5">
              <p className="text-xs font-medium text-red-300">{error}</p>
            </div>
          )}

          <Button
            onClick={handleVerifyCode}
            disabled={code.length !== 6}
            className={`w-full h-11 rounded-xl font-semibold transition-all ${
              code.length === 6
                ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg shadow-green-900/30"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
          >
            Verify Code
          </Button>

          <button
            onClick={() => { setStep("email"); setCode(""); setError(""); }}
            className="flex items-center justify-center gap-2 w-full text-sm text-[var(--glass-text-muted)] hover:text-[var(--glass-text)] transition"
          >
            <ArrowLeft size={14} /> Resend code
          </button>
        </>
      )}

      {/* ── Step 3 — New password ── */}
      {step === "password" && (
        <>
          <AuthInputField
            icon={Lock} name="newPass" type="password"
            placeholder="New password (min 6 characters)"
            value={newPass}
            onChange={e => { setNewPass(e.target.value); setError(""); }}
          />

          <AuthInputField
            icon={Lock} name="confirm" type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={e => { setConfirm(e.target.value); setError(""); }}
          />

          {error && (
            <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2.5">
              <p className="text-xs font-medium text-red-300">{error}</p>
            </div>
          )}

          <Button
            onClick={handleResetPassword}
            disabled={!newPass || !confirm}
            className={`w-full h-11 rounded-xl font-semibold transition-all ${
              newPass && confirm
                ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg shadow-green-900/30"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
          >
            Reset Password
          </Button>
        </>
      )}

      {/* ── Step 4 — Done ── */}
      {step === "done" && (
        <>
          <div className="flex justify-center py-4">
            <div className="h-16 w-16 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
          </div>

          <p className="text-center text-sm text-[var(--glass-text-muted)] leading-6">
            Your password has been reset successfully. You can now login with your new password.
          </p>

          <Link to="/login">
            <Button className="w-full h-11 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold">
              Go to Login
            </Button>
          </Link>
        </>
      )}

    </AuthLayout>
  );
}
