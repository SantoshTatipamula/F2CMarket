import bgImage from "@/assets/images/farm.webp";

/**
 * Shared layout for Login and Register — full-screen background image
 * with a centred glass card.
 *
 * @param {string}          title     - Card heading
 * @param {string}          subtitle  - Card sub-heading
 * @param {React.ReactNode} children  - Form fields + actions
 */
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 font-[Poppins]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="rounded-3xl border backdrop-blur-xl shadow-2xl p-8 space-y-6 bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--glass-text)]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mt-1">{title}</h1>
            <p className="text-sm text-[var(--glass-text-muted)] mt-1">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>
    </section>
  );
}
