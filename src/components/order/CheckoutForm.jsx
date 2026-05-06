import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CheckoutForm({
  formData,
  onChange,
}) {
  return (
    <Card className="rounded-2xl border-[var(--border)] shadow-sm">
      <CardContent className="p-6 space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Delivery Address
          </h2>

          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Enter your delivery details for fresh doorstep delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={onChange}
          />

          <Input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={onChange}
          />

          <Input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={onChange}
          />

          <Input
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={onChange}
          />
        </div>

        <Textarea
          name="address"
          placeholder="Full Address"
          rows={5}
          value={formData.address}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
}