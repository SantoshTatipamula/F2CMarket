import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  XCircle,
} from "lucide-react";

const statusConfig = {
  Delivered: {
    icon: CheckCircle2,
    textColor: "text-green-500",
    bgColor: "bg-green-500/15",
  },

  Pending: {
    icon: Clock3,
    textColor: "text-orange-500",
    bgColor: "bg-orange-500/15",
  },

  Processing: {
    icon: LoaderCircle,
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/15",
  },

  Cancelled: {
    icon: XCircle,
    textColor: "text-red-500",
    bgColor: "bg-red-500/15",
  },
};

export default function OrderStatusBadge({
  status,
}) {
  const config =
    statusConfig[status] ||
    statusConfig.Pending;

  const Icon = config.icon;

  return (
    <div
      className={`
        inline-flex items-center gap-1.5
        px-3 py-1.5 rounded-full
        text-xs font-medium
        ${config.bgColor}
        ${config.textColor}
      `}
    >
      <Icon size={14} />

      <span>{status}</span>
    </div>
  );
}