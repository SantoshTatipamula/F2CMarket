import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

/**
 * A glass-themed input with a leading icon.
 * When `type="password"`, a visibility toggle is added automatically.
 *
 * @param {React.ElementType} icon      - Lucide icon component
 * @param {string}            name      - Input name attribute
 * @param {string}            type      - Input type (text | email | password)
 * @param {string}            placeholder
 * @param {string}            value
 * @param {Function}          onChange
 */
export default function AuthInputField({
  icon: Icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative">
      <Icon className="absolute left-3 top-2 h-4 w-4 text-[var(--glass-text-muted)]" />

      <Input
        name={name}
        type={resolvedType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-10 pr-10 bg-[var(--glass-input)] border-[var(--glass-border)] text-[var(--glass-text)] placeholder:text-[var(--glass-text-muted)]"
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2 text-[var(--glass-text-muted)]"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
}
