import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock, CheckCircle2, XCircle, Mail, LogOut,
  Edit3, Save, Sprout, MapPin, Phone, FileText, User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { revealUp, stagger, viewport } from "@/utils/scrollReveal";

/* ── Status banner ────────────────────────────────────────────────── */
function StatusBanner({ status }) {
  const map = {
    pending: {
      bg:   "bg-amber-50 border-amber-200",
      icon: Clock,
      iconColor: "text-amber-500",
      iconBg:    "bg-amber-100",
      title: "Verification Pending",
      msg:   "Our admin team is reviewing your farm documents. This usually takes 24–48 hours.",
      pill:  "bg-amber-100 text-amber-700 border-amber-200",
    },
    rejected: {
      bg:   "bg-red-50 border-red-200",
      icon: XCircle,
      iconColor: "text-red-500",
      iconBg:    "bg-red-100",
      title: "Application Rejected",
      msg:   "Your application was not approved. Please update your details and contact support.",
      pill:  "bg-red-100 text-red-700 border-red-200",
    },
  };
  const cfg = map[status] || map.pending;
  const Icon = cfg.icon;

  return (
    <div className={`flex items-start gap-4 p-5 rounded-2xl border ${cfg.bg}`}>
      <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
        <Icon size={22} className={cfg.iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-bold text-[var(--text-primary)]">{cfg.title}</h3>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${cfg.pill}`}>
            {status}
          </span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mt-1 leading-5">{cfg.msg}</p>
      </div>
    </div>
  );
}

/* ── Steps tracker ────────────────────────────────────────────────── */
function StepsTracker({ status }) {
  const steps = [
    { label: "Account Created",        done: true                        },
    { label: "Documents Submitted",    done: true                        },
    { label: "Admin Reviewing",        done: status !== "pending", active: status === "pending" },
    { label: "Account Activated",      done: status === "approved"       },
  ];

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-5">
      <h3 className="font-bold text-[var(--text-primary)] mb-5">Verification Progress</h3>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
              step.done   ? "bg-[var(--primary)] border-[var(--primary)]"
              : step.active ? "bg-white border-amber-400"
              : "bg-white border-[var(--border)]"
            }`}>
              {step.done
                ? <CheckCircle2 size={14} className="text-white" />
                : step.active
                ? <Clock size={13} className="text-amber-500" />
                : <span className="h-2 w-2 rounded-full bg-[var(--border)]" />
              }
            </div>
            <span className={`text-sm font-medium ${
              step.done ? "text-[var(--text-primary)]"
              : step.active ? "text-amber-600"
              : "text-[var(--text-muted)]"
            }`}>{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Farm profile editor ──────────────────────────────────────────── */
function FarmProfileEditor({ user, onSave }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    farmName:     user?.farmName     || "",
    farmLocation: user?.farmLocation || "",
    phone:        user?.phone        || "",
    specialty:    user?.specialty    || "",
    experience:   user?.experience   || "",
    govId:        user?.govId        || "",
    farmRegNo:    user?.farmRegNo    || "",
    bio:          user?.bio          || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(form);
    setEditing(false);
  };

  const inputCls = "w-full h-11 px-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition disabled:opacity-60 disabled:cursor-not-allowed";

  const fields = [
    { icon: Sprout,   name: "farmName",     label: "Farm Name",          placeholder: "e.g. Ramesh Organic Farm" },
    { icon: MapPin,   name: "farmLocation", label: "Location",           placeholder: "e.g. Tirupati, Andhra Pradesh" },
    { icon: Phone,    name: "phone",        label: "Phone Number",       placeholder: "Your contact number" },
    { icon: Sprout,   name: "specialty",    label: "Specialty",          placeholder: "e.g. Vegetables, Rice, Fruits" },
    { icon: FileText, name: "govId",        label: "Government ID",      placeholder: "Aadhaar / PAN number" },
    { icon: FileText, name: "farmRegNo",    label: "Farm Reg. Number",   placeholder: "Farm registration (optional)" },
  ];

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <div>
          <h3 className="font-bold text-[var(--text-primary)]">Farm Profile</h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {editing ? "Editing — changes will be saved to your application" : "Your farm details submitted for verification"}
          </p>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className={`flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold transition ${
            editing
              ? "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
              : "border border-[var(--border)] hover:bg-[var(--surface)] text-[var(--text-secondary)]"
          }`}
        >
          {editing ? <><Save size={14} /> Save</> : <><Edit3 size={14} /> Edit</>}
        </button>
      </div>

      {/* Fields */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ icon: Icon, name, label, placeholder }) => (
          <div key={name}>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
              <Icon size={12} />
              {label}
            </label>
            <input
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={!editing}
              className={inputCls}
            />
          </div>
        ))}

        {/* Bio — full width */}
        <div className="sm:col-span-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
            <FileText size={12} />
            About Your Farm
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell customers about your farm, your farming practices, and what makes your produce special…"
            disabled={!editing}
            rows={3}
            className={`${inputCls} h-auto py-3 resize-none`}
          />
        </div>
      </div>

      {editing && (
        <div className="px-5 pb-5">
          <p className="text-xs text-[var(--text-muted)]">
            ℹ️ Saving updates your profile for admin review. Your account will be activated after approval.
          </p>
        </div>
      )}
    </div>
  );
}

/* ── What to prepare section ─────────────────────────────────────── */
function PreparationChecklist() {
  const items = [
    { done: true,  text: "Account registered"                                         },
    { done: true,  text: "Farm details submitted"                                     },
    { done: false, text: "Update farm profile above while waiting"                    },
    { done: false, text: "Prepare product photos and descriptions"                    },
    { done: false, text: "Wait for admin approval (24–48 hrs)"                        },
    { done: false, text: "Start listing your products after approval"                 },
  ];

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-5">
      <h3 className="font-bold text-[var(--text-primary)] mb-4">While You Wait</h3>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
              item.done ? "bg-[var(--primary)]" : "bg-[var(--surface)] border border-[var(--border)]"
            }`}>
              {item.done && <CheckCircle2 size={12} className="text-white" />}
            </div>
            <span className={`text-sm ${item.done ? "text-[var(--text-primary)] line-through opacity-60" : "text-[var(--text-secondary)]"}`}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────────────── */
export default function FarmerPendingDashboard() {
  const { user, updateUser, logout } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = (formData) => {
    updateUser({ ...user, ...formData });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)]">

      {/* Top bar */}
      <div className="bg-white border-b border-[var(--border)] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">{user?.name}</p>
              <p className="text-xs text-[var(--text-muted)]">Farmer · Pending verification</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="mailto:support@f2cmarket.com"
              className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition">
              <Mail size={13} /> Support
            </a>
            <button onClick={logout}
              className="flex items-center gap-1.5 h-8 px-3 rounded-xl border border-[var(--border)] text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface)] transition">
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Save success toast */}
      {saved && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-right-4">
          <CheckCircle2 size={15} /> Profile saved successfully
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-6">

        {/* Page heading */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={revealUp}>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Welcome, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-[var(--text-secondary)] mt-1 text-sm">
            Your farmer account is being verified. You can edit your farm profile while you wait.
          </p>
        </motion.div>

        {/* Status banner */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={revealUp}>
          <StatusBanner status={user?.verificationStatus || "pending"} />
        </motion.div>

        {/* Main grid */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Left — steps + checklist */}
          <div className="space-y-5">
            <motion.div variants={revealUp}>
              <StepsTracker status={user?.verificationStatus || "pending"} />
            </motion.div>
            <motion.div variants={revealUp}>
              <PreparationChecklist />
            </motion.div>
          </div>

          {/* Right — farm profile editor */}
          <motion.div variants={revealUp} className="lg:col-span-2">
            <FarmProfileEditor user={user} onSave={handleSave} />
          </motion.div>
        </motion.div>

        {/* Contact support */}
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={revealUp}>
          <div className="bg-white border border-[var(--border)] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">Need help?</h3>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">
                If you have questions about your application, contact us.
              </p>
            </div>
            <a href="mailto:support@f2cmarket.com"
              className="flex items-center gap-2 h-10 px-5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-sm font-semibold transition whitespace-nowrap">
              <Mail size={15} /> Contact Support
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
