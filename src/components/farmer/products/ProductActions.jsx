import { Pencil, Trash2, AlertTriangle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProductActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-3">
      {/* Edit */}
      <button
        onClick={onEdit}
        className="
          flex-1 h-10
          rounded-xl
          border border-black/5
          bg-[var(--surface-2)]
          text-sm font-medium
          transition-all duration-200
          hover:border-[var(--primary)]/20
          hover:text-[var(--primary)]
        "
      >
        <span className="flex items-center justify-center gap-2">
          <Pencil size={16} />
          Edit
        </span>
      </button>

      {/* Delete */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="
              flex-1 h-10
              rounded-xl
              border border-red-500/20
              bg-red-500/5
              text-sm font-medium text-red-500
              transition-all duration-200
              hover:bg-red-500/10
            "
          >
            <span className="flex items-center justify-center gap-2">
              <Trash2 size={16} />
              Delete
            </span>
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent
          className="
  overflow-hidden
  rounded-3xl
  border border-black/5
  bg-white
  p-0
  shadow-2xl
  backdrop-blur-sm
  sm:max-w-lg
"
        >
          {/* Header */}
          <div className="px-6 pt-6">
            <div
              className="
                flex h-14 w-14 items-center justify-center
                rounded-2xl
                bg-red-500/10
              "
            >
              <AlertTriangle size={26} className="text-red-500" />
            </div>

            <AlertDialogHeader className="mt-5 text-left">
              <AlertDialogTitle
                className="
                  text-2xl font-bold
                  text-[var(--text-primary)]
                "
              >
                Delete Product?
              </AlertDialogTitle>

              <AlertDialogDescription
                className="
                  mt-2 text-sm leading-relaxed
                  text-[var(--text-secondary)]
                "
              >
                This action cannot be undone. The product will be permanently
                removed from your marketplace inventory.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>

          {/* Footer */}
          <AlertDialogFooter
            className="
    flex-row justify-end gap-3
    px-6 pb-6 pt-2
  "
          >
            <AlertDialogCancel
              className="
  h-11 rounded-xl
  border border-black/10
  bg-white
  px-5
  hover:bg-[#F5F5F5]
"
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={onDelete}
              className="
  h-11 rounded-xl
  bg-red-500
  px-5
  text-white
  shadow-sm
  hover:bg-red-600
"
            >
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
