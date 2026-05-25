import { MapPin } from "lucide-react";

const inputClass = "w-full h-12 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition";

export default function CheckoutForm({ formData, onChange }) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl shadow-sm p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
          <MapPin size={17} className="text-[var(--primary)]" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">Delivery Address</h2>
          <p className="text-xs text-[var(--text-secondary)]">Where should we deliver your order?</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Name + Phone — side by side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={onChange}
            className={inputClass}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        {/* City + Pincode — side by side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={onChange}
            className={inputClass}
          />
          <input
            name="pincode"
            placeholder="Pincode"
            type="number"
            value={formData.pincode}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        {/* Full address */}
        <textarea
          name="address"
          placeholder="Full Address (House no., Street, Area…)"
          rows={3}
          value={formData.address}
          onChange={onChange}
          className={`${inputClass} h-auto py-3 resize-none`}
        />
      </div>
    </div>
  );
}