import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId || "F2C000000";


  return (
    <section className="min-h-screen bg-[var(--surface)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white border border-[var(--border)] rounded-3xl shadow-sm p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-[var(--primary)]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          Order Placed Successfully
        </h1>

        <p className="text-[var(--text-secondary)] mt-3 leading-7">
          Thank you for shopping with F2CMARKET.
          Fresh products will be delivered directly from farmers soon.
        </p>

        {/* Order ID */}
        <div className="mt-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] px-5 py-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Order ID
          </p>

          <p className="text-lg font-semibold text-[var(--text-primary)] mt-1">
            #{orderId}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="grid sm:grid-cols-2 gap-3 mt-8">
          <Link to="/products">
            <Button className="w-full h-12 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold">
              Continue Shopping
            </Button>
          </Link>

          <Link to="/orders">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl"
            >
              View Orders
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}