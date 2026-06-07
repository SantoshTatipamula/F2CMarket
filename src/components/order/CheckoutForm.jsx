import { MapPin, Clock } from "lucide-react";

const inputClass = "w-full h-12 px-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition";

const SLOTS = [
  { value: "morning",   label: "Morning",   time: "7 AM – 12 PM",  icon: "🌅" },
  { value: "afternoon", label: "Afternoon", time: "12 PM – 5 PM",  icon: "☀️" },
  { value: "evening",   label: "Evening",   time: "5 PM – 9 PM",   icon: "🌆" },
];

export default function CheckoutForm({ formData, onChange }) {
  const selectedSlot = formData.deliverySlot || "morning";

  const handleSlot = (value) => {
    onChange({ target: { name: "deliverySlot", value } });
  };

  return (
    <div className="space-y-4">

      {/* Delivery Address */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="fullName" placeholder="Full Name"
              value={formData.fullName} onChange={onChange} className={inputClass} />
            <input name="phone" placeholder="Phone Number" type="tel"
              value={formData.phone} onChange={onChange} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="city" placeholder="City"
              value={formData.city} onChange={onChange} className={inputClass} />
            <input name="pincode" placeholder="Pincode" type="number"
              value={formData.pincode} onChange={onChange} className={inputClass} />
          </div>
          <textarea name="address" placeholder="Full Address (House no., Street, Area…)"
            rows={3} value={formData.address} onChange={onChange}
            className={`${inputClass} h-auto py-3 resize-none`} />
        </div>
      </div>

      {/* Delivery Slot */}
      <div className="bg-white border border-[var(--border)] rounded-2xl shadow-sm p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="h-9 w-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <Clock size={17} className="text-[var(--primary)]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Delivery Slot</h2>
            <p className="text-xs text-[var(--text-secondary)]">Choose your preferred delivery time</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {SLOTS.map((slot) => (
            <button
              key={slot.value}
              type="button"
              onClick={() => handleSlot(slot.value)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                selectedSlot === slot.value
                  ? "border-[var(--primary)] bg-green-50"
                  : "border-[var(--border)] hover:border-green-300 bg-[var(--surface)]"
              }`}
            >
              <span className="text-2xl">{slot.icon}</span>
              <span className={`text-sm font-semibold ${selectedSlot === slot.value ? "text-[var(--primary)]" : "text-[var(--text-primary)]"}`}>
                {slot.label}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">{slot.time}</span>
            </button>
          ))}
        </div>

        <p className="text-xs text-[var(--text-muted)] mt-3">
          ⓘ Estimated delivery within 2 days from order confirmation.
        </p>
      </div>

    </div>
  );
}
