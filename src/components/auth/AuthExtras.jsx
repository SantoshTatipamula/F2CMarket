import { Button } from "@/components/ui/button";
import google from "@/assets/icons/google.png";

/** Horizontal OR divider */
export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-[var(--glass-border)]" />
      <span className="text-xs text-[var(--glass-text-muted)]">OR</span>
      <div className="flex-1 h-px bg-[var(--glass-border)]" />
    </div>
  );
}

/** Continue with Google button */
export function GoogleButton({ onClick }) {
  return (
    <Button
      variant="outline"
      className="w-full h-11 rounded-xl flex items-center justify-center gap-2 border-[var(--glass-border)] bg-[var(--glass-input)] hover:bg-[var(--glass-bg)] text-[var(--glass-text)]"
      onClick={onClick}
    >
      <img loading="lazy" src={google} alt="google" className="h-5 w-5" />
      Continue with Google
    </Button>
  );
}
