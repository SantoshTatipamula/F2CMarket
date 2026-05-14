import { Pencil, Trash2 } from "lucide-react";

export default function ProductActions({
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center gap-3">
      
      {/* Edit */}
      <button
        onClick={onEdit}
        className="
          flex-1 h-10
          rounded-xl
          border border-[var(--border)]
          bg-[var(--surface-2)]
          text-sm font-medium
          transition
          hover:border-[var(--primary)]
          hover:text-[var(--primary)]
        "
      >
        <span className="flex items-center justify-center gap-2">
          <Pencil size={16} />

          Edit
        </span>
      </button>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="
          flex-1 h-10
          rounded-xl
          border border-red-500/30
          bg-red-500/10
          text-sm font-medium text-red-500
          transition
          hover:bg-red-500/20
        "
      >
        <span className="flex items-center justify-center gap-2">
          <Trash2 size={16} />

          Delete
        </span>
      </button>
    </div>
  );
}