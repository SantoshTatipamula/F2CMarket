import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Users, MapPin, Phone, FileText, Sprout, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInputField from "@/components/auth/AuthInputField";
import AuthSelectField from "@/components/auth/AuthSelectField";
import { AuthDivider, GoogleButton } from "@/components/auth/AuthExtras";
import { sendWelcomeEmail } from "@/services/emailService";

function StepDots({ step, total }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-1">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`block rounded-full transition-all duration-300 ${
          i < step ? "h-2 w-2 bg-[var(--primary)]"
          : i === step ? "h-2 w-5 bg-[var(--primary)]"
          : "h-2 w-2 bg-white/25"
        }`} />
      ))}
    </div>
  );
}

function PendingScreen() {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="h-16 w-16 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-amber-400" />
        </div>
      </div>
      <h2 className="text-lg font-bold text-[var(--glass-text)]">Application Submitted!</h2>
      <p className="text-sm text-[var(--glass-text-muted)] leading-6">
        Your farmer account is under review. Our admin team will verify your farm details and documents within 24–48 hours.
      </p>
      <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-xs text-[var(--glass-text-muted)] text-left space-y-1.5">
        <p className="font-semibold text-[var(--glass-text)] mb-2">What happens next?</p>
        <p>1. Admin reviews your farm documents</p>
        <p>2. You receive an approval notification</p>
        <p>3. Login and start selling your produce</p>
      </div>
      <Link to="/login">
        <Button className="w-full h-11 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold mt-2">
          Back to Login
        </Button>
      </Link>
    </div>
  );
}

export default function Register() {
  const navigate          = useNavigate();
  const { register, users } = useAuth();

  const [step,    setStep]    = useState(0);
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", role: "consumer", password: "", confirmPassword: "",
    farmName: "", farmLocation: "", phone: "", specialty: "",
    experience: "", govId: "", farmRegNo: "",
  });

  const passwordsMatch = form.confirmPassword === "" || form.password === form.confirmPassword;
  const step0Valid = form.name.trim() && form.email.trim() && form.password.trim() &&
    form.confirmPassword.trim() && form.password === form.confirmPassword;
  const step1Valid = form.farmName.trim() && form.farmLocation.trim() &&
    form.phone.trim() && form.govId.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleStep0 = () => {
    if (!step0Valid) return;
    const existing = users || [];
    if (existing.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) {
      setError("An account with this email already exists."); return;
    }
    if (form.role === "farmer") { setStep(1); return; }
    submitRegistration();
  };

  const handleStep1 = () => {
    if (!step1Valid) { setError("Please fill all required fields."); return; }
    submitRegistration();
  };

  const submitRegistration = () => {
    setLoading(true);
    const newUser = {
      name: form.name.trim(), email: form.email.trim(), password: form.password,
      role: form.role, phone: form.phone, farmName: form.farmName,
      farmLocation: form.farmLocation, specialty: form.specialty,
      experience: form.experience, govId: form.govId, farmRegNo: form.farmRegNo,
    };
    setTimeout(() => {
      const saved = register(newUser);
      setLoading(false);
      /* Send welcome email (non-blocking) */
      sendWelcomeEmail({ name: saved.name, email: saved.email, role: saved.role });
      if (saved.role === "consumer") navigate("/");
      else setStep(2);
    }, 600);
  };

  const isFarmer   = form.role === "farmer";
  const totalSteps = isFarmer ? 2 : 1;

  return (
    <AuthLayout
      title={step === 2 ? "Application Sent" : step === 1 ? "Farm Details" : "Create Account"}
      subtitle={step === 2 ? "" : step === 1 ? "Tell us about your farm" : "Join F2CMARKET today"}
    >
      {step === 2 ? <PendingScreen /> : (
        <>
          {isFarmer && <StepDots step={step} total={totalSteps} />}

          {step === 0 && (
            <>
              <AuthInputField icon={User} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
              <AuthInputField icon={Mail} name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
              <AuthSelectField icon={Users} name="role" value={form.role} onChange={handleChange}
                options={[
                  { label: "Consumer — Buy fresh products", value: "consumer" },
                  { label: "Farmer — Sell your produce",   value: "farmer"   },
                ]} />
              <AuthInputField icon={Lock} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
              <AuthInputField icon={Lock} name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />

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
              {isFarmer && (
                <div className="rounded-xl bg-amber-500/15 border border-amber-400/25 px-4 py-3">
                  <p className="text-xs text-amber-300 leading-5">
                    <span className="font-semibold">Farmer accounts require verification.</span>{" "}
                    Admin approval takes 24–48 hours.
                  </p>
                </div>
              )}

              <Button onClick={handleStep0} disabled={!step0Valid}
                className={`w-full h-11 rounded-xl font-semibold transition-all ${
                  step0Valid
                    ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg shadow-green-900/30"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}>
                {isFarmer ? "Continue →" : "Create Account"}
              </Button>

              <AuthDivider />
              <GoogleButton />
              <p className="text-center text-sm text-[var(--glass-text-muted)]">
                Already have an account?{" "}
                <Link to="/login" className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold">Login</Link>
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <AuthInputField icon={Sprout} name="farmName" placeholder="Farm Name *" value={form.farmName} onChange={handleChange} />
              <AuthInputField icon={MapPin} name="farmLocation" placeholder="Location (District, State) *" value={form.farmLocation} onChange={handleChange} />
              <AuthInputField icon={Phone} name="phone" placeholder="Phone Number *" value={form.phone} onChange={handleChange} />
              <AuthInputField icon={Sprout} name="specialty" placeholder="Specialty (e.g. Vegetables, Rice)" value={form.specialty} onChange={handleChange} />
              <AuthSelectField icon={FileText} name="experience" value={form.experience} onChange={handleChange}
                options={[
                  { label: "Select Experience",  value: ""    },
                  { label: "Less than 1 year",   value: "<1"  },
                  { label: "1–3 years",          value: "1-3" },
                  { label: "3–5 years",          value: "3-5" },
                  { label: "5–10 years",         value: "5-10"},
                  { label: "More than 10 years", value: "10+" },
                ]} />
              <AuthInputField icon={FileText} name="govId" placeholder="Government ID (Aadhaar/PAN) *" value={form.govId} onChange={handleChange} />
              <AuthInputField icon={FileText} name="farmRegNo" placeholder="Farm Registration No. (optional)" value={form.farmRegNo} onChange={handleChange} />

              <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
                <p className="text-xs text-[var(--glass-text-muted)] leading-5">
                  <span className="font-semibold text-[var(--glass-text)]">Note:</span>{" "}
                  Physical documents can be uploaded via your profile after approval.
                </p>
              </div>

              {error && (
                <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2.5">
                  <p className="text-xs font-medium text-red-300">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => { setStep(0); setError(""); }}
                  className="h-11 rounded-xl border border-white/20 text-sm font-medium text-[var(--glass-text-muted)] hover:bg-white/10 transition">
                  ← Back
                </button>
                <Button onClick={handleStep1} disabled={!step1Valid || loading}
                  className={`h-11 rounded-xl font-semibold transition-all ${
                    step1Valid && !loading
                      ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg shadow-green-900/30"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}>
                  {loading
                    ? <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Submitting…
                      </span>
                    : "Submit Application"}
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </AuthLayout>
  );
}
