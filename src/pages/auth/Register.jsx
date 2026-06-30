import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Users,
  MapPin,
  Phone,
  FileText,
  Sprout,
  CheckCircle2,
} from "lucide-react";
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/pages/auth/authValidation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInputField from "@/components/auth/AuthInputField";
import AuthSelectField from "@/components/auth/AuthSelectField";
import { AuthDivider, GoogleButton } from "@/components/auth/AuthExtras";
import { sendWelcomeEmail } from "@/services/emailService";
import { uploadImage } from "@/services/cloudinaryService";
import LocationDialog from "@/components/home/hero/LocationDialog";

function StepDots({ step, total }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`block rounded-full transition-all duration-300 ${
            i < step
              ? "h-2 w-2 bg-[var(--primary)]"
              : i === step
                ? "h-2 w-5 bg-[var(--primary)]"
                : "h-2 w-2 bg-white/25"
          }`}
        />
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
      <h2 className="text-lg font-bold text-[var(--glass-text)]">
        Application Submitted!
      </h2>
      <p className="text-sm text-[var(--glass-text-muted)] leading-6">
        Your farmer account is under review. Our admin team will verify your
        farm details and documents within 24–48 hours.
      </p>
      <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-xs text-[var(--glass-text-muted)] text-left space-y-1.5">
        <p className="font-semibold text-[var(--glass-text)] mb-2">
          What happens next?
        </p>
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

// ── helper: convert a File to a base64 data-URL ──────────────────────────────

export default function Register() {
  const navigate = useNavigate();
  const { register, users, signInWithGoogle } = useAuth();

  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);

  // FIX 1: idType and idDocumentFile were missing from initial state
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "consumer",
    password: "",
    confirmPassword: "",
    farmName: "",
    farmLocation: "",
    phone: "",
    specialty: "",
    experience: "",
    farmRegNo: "",
    idType: "",
    idDocumentFile: null, // stores the raw File object
  });

  const step0Valid =
    form.name.trim() &&
    form.email.trim() &&
    form.password.trim() &&
    form.confirmPassword.trim() &&
    form.password === form.confirmPassword &&
    !validateName(form.name) &&
    !validateEmail(form.email) &&
    !validatePassword(form.password);

  // FIX 2: use idDocumentFile (the stored File) instead of form.idDocument
  const step1Valid =
    form.farmName.trim() &&
    form.farmLocation &&
    form.phone.trim() &&
    form.idType &&
    form.idDocumentFile &&
    !validatePhone(form.phone);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    let validationError = "";

    switch (name) {
      case "name":
        validationError = validateName(value);
        break;
      case "email":
        validationError = validateEmail(value);
        break;
      case "password":
        validationError = validatePassword(value);
        break;
      case "confirmPassword":
        validationError =
          value !== form.password ? "Passwords do not match" : "";
        break;
      case "phone":
        validationError = validatePhone(value);
        break;
      // FIX 3: idType is now handled so its error state is cleared
      case "idType":
        validationError = value ? "" : "Please select an ID type";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: validationError }));
    if (error) setError("");
  };

  // FIX 4: dedicated handler for the file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and PDF files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      idDocumentFile: file,
    }));

    setError("");
  };

  const handleStep0 = () => {
    if (!step0Valid) return;
    const existing = users || [];
    if (
      existing.some((u) => u.email.toLowerCase() === form.email.toLowerCase())
    ) {
      setError("An account with this email already exists.");
      return;
    }
    if (form.role === "farmer") {
      setStep(1);
      return;
    }
    submitRegistration();
  };

  const handleStep1 = () => {
    if (!step1Valid) {
      setError("Please fill all required fields.");
      return;
    }
    submitRegistration();
  };

  const submitRegistration = async () => {
    setLoading(true);
    setError("");

    try {
      let documentUrl = "";

      // Upload farmer document to Cloudinary
      if (form.role === "farmer" && form.idDocumentFile) {
        setError("Uploading verification document...");

        documentUrl = await uploadImage(
          form.idDocumentFile,
          "f2cmarket/verification-documents",
        );

        setError("");
      }

      const newUser = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,

        phone: form.phone,
        specialty: form.specialty,
        experience: form.experience,
        farmRegNo: form.farmRegNo,

        verificationStatus: form.role === "farmer" ? "pending" : "approved",

        verified: form.role !== "farmer",

        verificationDocuments: {
          idType: form.idType,
          idDocumentUrl: documentUrl,
        },

        profile: {
          bio: "",
          location:
            form.role === "farmer"
              ? form.farmLocation?.city || form.farmLocation || ""
              : "",
        },

        farmerProfile: {
          farmName: form.farmName,
          location: form.farmLocation,
          documents: documentUrl ? [documentUrl] : [],
        },

        banned: false,
      };

      const saved = await register(newUser);

      sendWelcomeEmail({
        name: saved.name,
        email: saved.email,
        role: saved.role,
      });

      if (saved.role === "consumer") {
        navigate("/");
      } else {
        setStep(2);
      }
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setError("Password is too weak. Please choose a stronger password.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;

        default:
          setError(err.message || "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const result = await signInWithGoogle();
      if (!result.success) {
        setError(result.error);
        return;
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const isFarmer = form.role === "farmer";
  const totalSteps = isFarmer ? 2 : 1;

  return (
    <AuthLayout
      title={
        step === 2
          ? "Application Sent"
          : step === 1
            ? "Farm Details"
            : "Create Account"
      }
      subtitle={
        step === 2
          ? ""
          : step === 1
            ? "Tell us about your farm"
            : "Join F2CMARKET today"
      }
    >
      {step === 2 ? (
        <PendingScreen />
      ) : (
        <>
          {isFarmer && <StepDots step={step} total={totalSteps} />}

          {step === 0 && (
            <>
              <AuthInputField
                icon={User}
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-xs text-red-300 -mt-2 mb-2 px-1">
                  {errors.name}
                </p>
              )}

              <AuthInputField
                icon={Mail}
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-xs text-red-300 -mt-2 mb-2 px-1">
                  {errors.email}
                </p>
              )}

              <AuthSelectField
                icon={Users}
                name="role"
                value={form.role}
                onChange={handleChange}
                options={[
                  { label: "Consumer — Buy fresh products", value: "consumer" },
                  { label: "Farmer — Sell your produce", value: "farmer" },
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
              {errors.password && (
                <p className="text-xs text-red-300 -mt-2 mb-2 px-1">
                  {errors.password}
                </p>
              )}

              <AuthInputField
                icon={Lock}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-300 -mt-2 mb-2 px-1">
                  {errors.confirmPassword}
                </p>
              )}

              {/* <div className="rounded-xl bg-white/10 border border-white/20 p-3 space-y-1">
                <p className="text-xs text-[var(--glass-text-muted)] mb-2">
                  Password requirements:
                </p>
                <p
                  className={`text-xs ${form.password.length >= 8 ? "text-green-400" : "text-white/50"}`}
                >
                  ✓ Minimum 8 characters
                </p>
                <p
                  className={`text-xs ${/[A-Z]/.test(form.password) ? "text-green-400" : "text-white/50"}`}
                >
                  ✓ One uppercase letter
                </p>
                <p
                  className={`text-xs ${/[a-z]/.test(form.password) ? "text-green-400" : "text-white/50"}`}
                >
                  ✓ One lowercase letter
                </p>
                <p
                  className={`text-xs ${/[0-9]/.test(form.password) ? "text-green-400" : "text-white/50"}`}
                >
                  ✓ One number
                </p>
                <p
                  className={`text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(form.password) ? "text-green-400" : "text-white/50"}`}
                >
                  ✓ One special character
                </p>
              </div> */}

              {error && (
                <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2.5">
                  <p className="text-xs font-medium text-red-300">{error}</p>
                </div>
              )}

              {isFarmer && (
                <div className="rounded-xl bg-amber-500/15 border border-amber-400/25 px-4 py-3">
                  <p className="text-xs text-amber-300 leading-5">
                    <span className="font-semibold">
                      Farmer accounts require verification.
                    </span>{" "}
                    Admin approval takes 24–48 hours.
                  </p>
                </div>
              )}

              <Button
                onClick={handleStep0}
                disabled={!step0Valid}
                className={`w-full h-11 rounded-xl font-semibold transition-all ${
                  step0Valid
                    ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg shadow-green-900/30"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}
              >
                {isFarmer ? "Continue →" : "Create Account"}
              </Button>

              {!isFarmer && (
                <>
                  <AuthDivider />
                  <GoogleButton onClick={handleGoogleRegister} />
                </>
              )}

              <p className="text-center text-sm text-[var(--glass-text-muted)]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-semibold"
                >
                  Login
                </Link>
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <AuthInputField
                icon={Sprout}
                name="farmName"
                placeholder="Farm Name *"
                value={form.farmName}
                onChange={handleChange}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--glass-text)]">
                  Farm Location *
                </label>
                <button
                  type="button"
                  onClick={() => setShowLocationDialog(true)}
                  className="flex h-12 w-full items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 text-left text-sm text-[var(--glass-text)] transition hover:bg-white/15"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>
                      {form.farmLocation?.city || "Select Farm Location"}
                    </span>
                  </div>
                </button>
              </div>

              <LocationDialog
                open={showLocationDialog}
                onOpenChange={setShowLocationDialog}
                value={form.farmLocation}
                onConfirm={(location) =>
                  setForm((prev) => ({ ...prev, farmLocation: location }))
                }
              />

              <AuthInputField
                icon={Phone}
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-xs text-red-300 -mt-2 mb-2 px-1">
                  {errors.phone}
                </p>
              )}

              <AuthInputField
                icon={Sprout}
                name="specialty"
                placeholder="Specialty (e.g. Vegetables, Rice)"
                value={form.specialty}
                onChange={handleChange}
              />

              <AuthSelectField
                icon={FileText}
                name="experience"
                value={form.experience}
                onChange={handleChange}
                options={[
                  { label: "Select Experience", value: "" },
                  { label: "Less than 1 year", value: "<1" },
                  { label: "1–3 years", value: "1-3" },
                  { label: "3–5 years", value: "3-5" },
                  { label: "5–10 years", value: "5-10" },
                  { label: "More than 10 years", value: "10+" },
                ]}
              />

              {/* FIX 8: removed orphaned govId error — no govId input exists in Step 1 */}
              <AuthSelectField
                icon={FileText}
                name="idType"
                value={form.idType}
                onChange={handleChange}
                options={[
                  { label: "Select Government ID *", value: "" },
                  { label: "Aadhaar Card", value: "aadhaar" },
                  { label: "PAN Card", value: "pan" },
                  { label: "Driving Licence", value: "driving_license" },
                  { label: "Voter ID", value: "voter_id" },
                ]}
              />
              {errors.idType && (
                <p className="text-xs text-red-300 -mt-2 mb-2 px-1">
                  {errors.idType}
                </p>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--glass-text)]">
                  Upload Document *
                </label>
                {/* FIX 9: use handleFileChange, not handleChange */}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-[var(--glass-text)] file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--primary)] file:px-4 file:py-2 file:text-white file:cursor-pointer"
                />
                {/* FIX 10: show file name confirmation once selected */}
                {form.idDocumentFile && (
                  <p className="text-xs text-green-400 px-1">
                    ✓ {form.idDocumentFile.name}
                  </p>
                )}
              </div>

              

              {error && (
                <div className="rounded-xl bg-red-500/20 border border-red-400/30 px-4 py-2.5">
                  <p className="text-xs font-medium text-red-300">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setStep(0);
                    setError("");
                  }}
                  className="h-11 rounded-xl border border-white/20 text-sm font-medium text-[var(--glass-text-muted)] hover:bg-white/10 transition"
                >
                  ← Back
                </button>
                <Button
                  onClick={handleStep1}
                  disabled={!step1Valid || loading}
                  className={`h-11 rounded-xl font-semibold transition-all ${
                    step1Valid && !loading
                      ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-lg shadow-green-900/30"
                      : "bg-white/10 text-white/40 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Submitting…
                    </span>
                  ) : (
                    "Submit "
                  )}
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </AuthLayout>
  );
}
