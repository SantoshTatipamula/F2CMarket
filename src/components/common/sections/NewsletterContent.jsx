export default function NewsletterContent() {
  return (
    <>
      <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
        Join the F2CMARKET Community
      </h3>

      <p className="mt-4 text-green-50 text-lg leading-relaxed max-w-xl">
        Subscribe now and receive fresh product alerts, price drops and weekly
        farmer specials.
      </p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90 font-medium">
        <span>🌿 Fresh Updates</span>
        <span>💰 Special Discounts</span>
        <span>🚚 Early Access</span>
      </div>
    </>
  );
}