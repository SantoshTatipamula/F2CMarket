import { ChevronDown } from "lucide-react";

export default function AuthSelectField({
  icon: Icon,
  name,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="relative">
      
      {/* Left Icon */}
      {Icon && (
        <Icon
          className="
            pointer-events-none
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            h-4
            w-4
            text-[var(--glass-text-muted)]
            z-10
          "
        />
      )}

      {/* Select */}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-9
          pl-10
          pr-10
          rounded-xl
          border border-[var(--glass-border)]
          bg-[var(--glass-input)]
          text-sm text-[var(--glass-text)]
          appearance-none
          cursor-pointer
          outline-none
          focus:border-[var(--primary)]
          focus:ring-1 focus:ring-[var(--primary)]
          transition
          backdrop-blur-xl
          flex
          items-center
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#1a2e1a] text-white"
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Right Chevron */}
      <ChevronDown
        size={16}
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-[var(--glass-text-muted)]
        "
      />
    </div>
  );
}