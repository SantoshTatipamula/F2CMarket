import { Button } from "@/components/ui/button";

export default function PlaceOrderButton({
  onClick,
  loading = false,
  disabled = false,
}) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full h-12 rounded-xl font-semibold transition ${
  disabled
    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
    : "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white"
}`}
    >
      {loading ? "Placing Order..." : "Place Order"}
    </Button>
  );
}