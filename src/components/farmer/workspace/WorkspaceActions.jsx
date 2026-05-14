import { Search } from "lucide-react";

export default function WorkspaceActions({
  searchValue = "",
  onSearchChange,
  placeholder = "Search...",
  children,
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      
      {/* Search */}
      <div className="relative w-full lg:max-w-sm">
        
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
        />

        <input
          type="text"
          value={searchValue}
          onChange={(e) =>
            onSearchChange?.(e.target.value)
          }
          placeholder={placeholder}
          className="
            w-full h-11
            rounded-xl
            border border-[var(--border)]
            bg-[var(--surface)]
            pl-10 pr-4
            text-sm
            outline-none
            transition
            focus:border-[var(--primary)]
          "
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  );
}