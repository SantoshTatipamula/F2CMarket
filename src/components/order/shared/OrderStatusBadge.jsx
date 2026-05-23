import {
  CheckCircle2, Clock3, LoaderCircle,
  XCircle, PackageCheck, Truck, ShieldCheck,
} from "lucide-react";

/**
 * Shared OrderStatusBadge — used by Consumer, Farmer, and Admin views.
 * Covers every status in the order lifecycle.
 */
const STATUS_CONFIG = {
  Pending:   { icon: Clock3,       text: "text-orange-500", bg: "bg-orange-500/15" },
  Accepted:  { icon: ShieldCheck,  text: "text-blue-500",   bg: "bg-blue-500/15"   },
  Packed:    { icon: PackageCheck, text: "text-purple-500", bg: "bg-purple-500/15" },
  Shipped:   { icon: Truck,        text: "text-sky-500",    bg: "bg-sky-500/15"    },
  Delivered: { icon: CheckCircle2, text: "text-green-500",  bg: "bg-green-500/15"  },
  Cancelled: { icon: XCircle,      text: "text-red-500",    bg: "bg-red-500/15"    },
  Processing:{ icon: LoaderCircle, text: "text-blue-500",   bg: "bg-blue-500/15"   },
};

export default function OrderStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  const Icon   = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      <Icon size={13} />
      {status}
    </span>
  );
}
