import { Link } from "react-router-dom";
import { Clock, CheckCircle2, Mail, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PendingVerification() {
  const { user, logout } = useAuth();

  const steps = [
    { icon: CheckCircle2, label: "Application submitted",     done: true  },
    { icon: Clock,        label: "Admin reviewing documents", done: false },
    { icon: CheckCircle2, label: "Account activated",         done: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-amber-500/20 border-2 border-amber-400/40 flex items-center justify-center">
            <Clock size={36} className="text-amber-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">Verification Pending</h1>
        <p className="text-white/70 text-sm text-center leading-6 mb-6">
          Hi <span className="font-semibold text-white">{user?.name}</span>, your farmer account is under review.
          Our admin team verifies all farm documents within 24–48 hours.
        </p>

        <div className="space-y-3 mb-6">
          {steps.map(({ icon: Icon, label, done }, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
              done ? "bg-green-500/20 border-green-400/30" : "bg-white/5 border-white/10"
            }`}>
              <Icon size={18} className={done ? "text-green-400" : "text-white/40"} />
              <span className={`text-sm font-medium ${done ? "text-green-300" : "text-white/50"}`}>{label}</span>
            </div>
          ))}
        </div>

        {user?.farmName && (
          <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-3 mb-6">
            <p className="text-xs text-white/50 mb-2 font-semibold uppercase tracking-wide">Your Application</p>
            <div className="grid grid-cols-2 gap-y-1.5 text-xs text-white/80">
              <span className="text-white/50">Farm Name</span><span className="font-medium">{user.farmName}</span>
              <span className="text-white/50">Location</span><span className="font-medium">{user.farmLocation}</span>
              <span className="text-white/50">Specialty</span><span className="font-medium">{user.specialty || "—"}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-white/50 mb-6 justify-center">
          <Mail size={13} />
          <span>Questions? <a href="mailto:support@f2cmarket.com" className="text-[var(--primary)] underline">support@f2cmarket.com</a></span>
        </div>

        <button onClick={logout}
          className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-white/20 text-sm font-medium text-white/70 hover:bg-white/10 transition">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}
