import { Package, Clock3, CheckCircle2, XCircle } from "lucide-react";

const STATS = [
  { key: "total",     label: "Total Orders",     icon: Package,      color: "text-blue-600",   bg: "bg-blue-50"   },
  { key: "pending",   label: "Pending",           icon: Clock3,       color: "text-orange-600", bg: "bg-orange-50" },
  { key: "delivered", label: "Delivered",         icon: CheckCircle2, color: "text-green-600",  bg: "bg-green-50"  },
  { key: "cancelled", label: "Cancelled",         icon: XCircle,      color: "text-red-600",    bg: "bg-red-50"    },
];

export default function OrdersSummary({ stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {STATS.map(({ key, label, icon: Icon, color, bg }) => (
        <div key={key} className="bg-white border border-[var(--border)] rounded-2xl p-4 flex items-center gap-3">
          <div className={`h-10 w-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
            <Icon size={18} className={color} />
          </div>
          <div>
            <p className="text-xl font-bold text-[var(--text-primary)]">{stats[key]}</p>
            <p className="text-xs text-[var(--text-muted)]">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
