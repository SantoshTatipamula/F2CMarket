import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function WorkspaceHeader({
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>

      {/* Right Action */}
      {actionLabel && (
        <Button
          onClick={onAction}
          className="h-11 rounded-xl px-5"
        >
          <Plus size={18} />

          <span>{actionLabel}</span>
        </Button>
      )}
    </div>
  );
}