import { Settings2, Bell, Shield, Store, ChevronRight } from "lucide-react";

import { Link } from "react-router-dom";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

export default function ProfileSettings() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section
        className="
          mx-auto
          max-w-6xl
          px-4 py-8
          lg:px-8
        "
      >
        {/* Hero */}
        <div
          className="
            overflow-hidden
            rounded-[32px]
            border border-black/5
            bg-[var(--surface)]
            shadow-sm
          "
        >
          {/* Banner */}
          <div
            className="
              bg-gradient-to-br
              from-[var(--primary)]
              via-[var(--primary)]/90
              to-emerald-500
              px-8 py-10
              text-white
            "
          >
            <div
              className="
                inline-flex items-center
                rounded-full
                bg-white/10
                px-4 py-1.5
                text-sm font-semibold
                backdrop-blur-md
              "
            >
              Account Preferences
            </div>

            <div className="mt-6 flex items-start gap-4">
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-white/10
                  backdrop-blur-md
                "
              >
                <Settings2 size={24} />
              </div>

              <div>
                <h1
                  className="
                    text-3xl font-bold
                    tracking-tight
                  "
                >
                  Profile Settings
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm leading-relaxed
                    text-white/80
                  "
                >
                  Manage your account preferences, marketplace settings, and
                  profile visibility across F2CMARKET.
                </p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Account */}
            <ProfileCard>
              <ProfileCardHeader
                title="Account Settings"
                description="Manage your account preferences and security options."
              />

              <div className="mt-8 space-y-4">
                <SettingsRow
                  icon={Shield}
                  title="Security Settings"
                  description="Manage password and account protection."
                  to="/profile/security"
                />

                <SettingsRow
                  icon={Bell}
                  title="Notifications"
                  description="Manage email and marketplace notifications."
                  to="/profile/notifications"
                />
              </div>
            </ProfileCard>

            {/* Marketplace */}
            <ProfileCard>
              <ProfileCardHeader
                title="Marketplace Settings"
                description="Manage your marketplace visibility and seller preferences."
              />

              <div className="mt-8 space-y-4">
                <SettingsRow
                  icon={Store}
                  title="Seller Products"
                  description="Manage your marketplace products and listings."
                  to="/profile/seller-products"
                />
              </div>
            </ProfileCard>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Reusable Settings Row */
function SettingsRow({ icon: Icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="
        flex items-center justify-between
        rounded-2xl
        border border-black/5
        bg-[var(--surface-2)]
        p-5
        transition-all duration-300
        hover:border-[var(--primary)]/20
        hover:bg-[var(--primary)]/5
      "
    >
      <div className="flex items-start gap-4">
        <div
          className="
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            bg-[var(--primary)]/10
            text-[var(--primary)]
          "
        >
          <Icon size={22} />
        </div>

        <div>
          <h3
            className="
              text-base font-semibold
              text-[var(--text-primary)]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-sm leading-relaxed
              text-[var(--text-secondary)]
            "
          >
            {description}
          </p>
        </div>
      </div>

      <ChevronRight size={20} className="text-[var(--text-secondary)]" />
    </Link>
  );
}
